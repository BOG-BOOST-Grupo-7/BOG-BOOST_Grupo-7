import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { getAllStands, getStandById } from '../../api/api';
import { StandMarker } from './StandMarker';
import ModalProductos from './ModalProductos';
import { useAuth } from '../../context/AuthContext';
import { MAPA_PUESTOS } from '../../data/mapaRefencia';
import './HomeMap.css';

export const HomeMap = () => {
  const [stands, setStands] = useState([]);
  const [selectedStand, setSelectedStand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStand, setHoveredStand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idNegocio, setIdNegocio] = useState(null);
  const { user } = useAuth();
  const containerRef = useRef(null);

  // ============================================
  // CARGAR PUESTOS
  // ============================================

  useEffect(() => {
    loadStands();
  }, []);

  const loadStands = async () => {
    try {
      setLoading(true);
      const data = await getAllStands();
      
      // Enriquecer los puestos con coordenadas del mapa de referencia
      const standsConPosiciones = data.map((stand) => {
        const posicion = calcularPosicion(stand.numero_puesto);
        return {
          ...stand,
          coordinates: posicion || { x: 0, y: 0 }
        };
      });
      
      setStands(standsConPosiciones);
      setError(null);
    } catch (err) {
      setError('Error al cargar los puestos del mercado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CALCULAR POSICIONES CON MAPA DE REFERENCIA
  // ============================================

  const calcularPosicion = (numeroPuesto) => {
    if (!numeroPuesto) return null;

    // Buscar el puesto en el mapa de referencia
    const filaEncontrada = MAPA_PUESTOS.find(fila => 
      fila.numeros && fila.numeros.includes(numeroPuesto)
    );

    // Separación entre puestos
    const separacionX = 35;
    const separacionY = 30;
    const margen = 20;

    let posX, posY;

    if (filaEncontrada) {
      const indiceEnFila = filaEncontrada.numeros.indexOf(numeroPuesto);
      posX = margen + (indiceEnFila * separacionX);
      posY = margen + (filaEncontrada.fila * separacionY);
    } else {
      // Si no está en la referencia, calcular automáticamente
      const index = MAPA_PUESTOS.reduce((acc, fila) => acc + fila.numeros.length, 0);
      const columna = index % 15;
      const filaAuto = Math.floor(index / 15) + 1;
      posX = margen + (columna * separacionX);
      posY = margen + (filaAuto * separacionY);
    }

    return { x: posX, y: posY };
  };

  // ============================================
  // MANEJADORES DE EVENTOS
  // ============================================

  const handleStandClick = async (stand) => {
    try {
      const details = await getStandById(stand.id_puesto || stand.id);
      setSelectedStand(details);
      setShowModal(true);
      setIdNegocio(details.negocioId || details.id_negocio || null);
    } catch (err) {
      console.error('Error al cargar detalles del puesto:', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStand(null);
    setIdNegocio(null);
  };

  const handleStandHover = (stand) => {
    setHoveredStand(stand);
  };

  const handleStandLeave = () => {
    setHoveredStand(null);
  };

  // ============================================
  // RENDER - ESTADOS DE CARGA Y ERROR
  // ============================================

  if (loading) {
    return (
      <div className="map-loading">
        <div className="loader"></div>
        <p>Cargando mapa del Mercado de Pulgas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-error">
        <p>{error}</p>
        <button onClick={loadStands} className="btn-retry">
          Reintentar
        </button>
      </div>
    );
  }

  // ============================================
  // CALCULAR DIMENSIONES DEL MAPA
  // ============================================

  const mapHeight = 700;
  const mapWidth = 1200;

  // ============================================
  // RENDER PRINCIPAL
  // ============================================

  return (
    <div className="home-map-container" ref={containerRef}>
      {/* ===== HEADER ===== */}
      <div className="map-header">
        <div className="map-title-section">
          <h2>📍 Mercado de Pulgas San Alejo</h2>
          <p className="map-subtitle">
            {stands.length} puestos • {stands.filter(s => s.isAvailable !== false).length} disponibles
          </p>
        </div>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color available"></span>
            <span>Disponible</span>
          </div>
          <div className="legend-item">
            <span className="legend-color occupied"></span>
            <span>Ocupado</span>
          </div>
          <div className="legend-item">
            <span className="legend-color museum"></span>
            <span>Museo de Arte</span>
          </div>
          {user && (
            <div className="legend-item">
              <span className="legend-color owner"></span>
              <span>Tu puesto</span>
            </div>
          )}
        </div>
      </div>

      {/* ===== MAPA CON ZOOM ===== */}
      <TransformWrapper
        initialScale={0.6}
        minScale={0.3}
        maxScale={3}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
        doubleClick={{ step: 0.5 }}
        pan={{ velocity: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="map-wrapper">
            {/* ===== CONTROLES DE ZOOM ===== */}
            <div className="map-controls">
              <button onClick={() => zoomIn(0.2)} className="control-btn" title="Acercar">
                +
              </button>
              <button onClick={() => zoomOut(0.2)} className="control-btn" title="Alejar">
                −
              </button>
              <button onClick={() => resetTransform()} className="control-btn" title="Reiniciar">
                ⟲
              </button>
            </div>

            {/* ===== CONTENIDO DEL MAPA ===== */}
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%'
              }}
              contentStyle={{
                width: `${mapWidth}px`,
                height: `${mapHeight}px`
              }}
            >
              <div
                className="map-grid"
                style={{
                  width: `${mapWidth}px`,
                  height: `${mapHeight}px`,
                  position: 'relative',
                  background: '#f0f2f5',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                {/* ===== FONDO CON CUADRÍCULA ===== */}
                <div className="map-background">
                  {Array.from({ length: Math.ceil(mapWidth / 35) }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="grid-line vertical"
                      style={{ left: `${i * 35}px` }}
                    />
                  ))}
                  {Array.from({ length: Math.ceil(mapHeight / 30) }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="grid-line horizontal"
                      style={{ top: `${i * 30}px` }}
                    />
                  ))}
                </div>

                {/* ===== RENDERIZAR PUESTOS ===== */}
                {stands.map((stand, index) => {
                  // Usar coordenadas del mapa de referencia
                  const pos = stand.coordinates || calcularPosicion(stand.numero_puesto);
                  
                  if (!pos) return null;

                  const isHovered = hoveredStand?.id_puesto === stand.id_puesto || 
                                   hoveredStand?.id === stand.id;
                  const isUserStand = user && (stand.userId === user.id || stand.usuario_id === user.id);
                  const isAvailable = stand.isAvailable !== false;

                  return (
                    <StandMarker
                      key={stand.id_puesto || stand.id || index}
                      stand={{
                        ...stand,
                        id: stand.id_puesto || stand.id,
                        coordinates: pos,
                        isAvailable: isAvailable,
                        userId: stand.userId || stand.usuario_id
                      }}
                      standsAtPosition={[stand]}
                      onClick={() => handleStandClick(stand)}
                      onHover={() => handleStandHover(stand)}
                      onLeave={handleStandLeave}
                      isHovered={isHovered}
                      isUserStand={isUserStand}
                    />
                  );
                })}

                {/* ===== ETIQUETAS DE SECCIONES ===== */}
                <div className="section-label" style={{ top: '10px', left: '10px' }}>
                  🎨 Museo de Arte Moderno
                </div>
                <div className="section-label" style={{ top: '80px', left: '200px' }}>
                  📚 Sección Principal
                </div>
                <div className="section-label" style={{ top: '300px', left: '20px' }}>
                  🛍️ Sección Oeste
                </div>
                <div className="section-label" style={{ top: '50px', right: '20px' }}>
                  💿 Sección Norte
                </div>
                <div className="section-label" style={{ bottom: '50px', left: '150px' }}>
                  🌿 Sección Sur
                </div>
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>

      {/* ===== MODAL DE DETALLES ===== */}
      {selectedStand && (
        <ModalProductos
          abierto={showModal}
          onClose={handleCloseModal}
          idNegocio={idNegocio}
          standData={selectedStand}
          isOwner={user && (selectedStand.userId === user.id || selectedStand.usuario_id === user.id)}
          isMapMode={true}
        />
      )}
    </div>
  );
};

export default HomeMap;