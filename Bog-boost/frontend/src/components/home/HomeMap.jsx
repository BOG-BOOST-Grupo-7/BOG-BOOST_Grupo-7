import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { getAllStands, getStandById } from '../../api/api';
import StandMarker from "./StandMarker";
import ModalProductos from "./ModalProductos";
import "./HomeMap.css";
import { useAuth } from '../../context/AuthContext';

import { MAPA_PUESTOS } from '../../data/mapaRefencia';

const HomeMap = () => {
  const [stands, setStands] = useState([]);
  const [selectedStand, setSelectedStand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStand, setHoveredStand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idNegocio, setIdNegocio] = useState(null);
  const { user } = useAuth();
  const containerRef = useRef(null);

  useEffect(() => {
    loadStands();
  }, []);

  const loadStands = async () => {
    try {
      setLoading(true);
      const data = await getAllStands();
      setStands(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los puestos del mercado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStandClick = async (stand) => {
    try {
      const details = await getStandById(stand.id_puesto); // <--- CORREGIDO (usaba stand.id)
      setSelectedStand(details);
      setShowModal(true);
      setIdNegocio(details.id_negocio || null);
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

  //  CALCULAR POSICIONES
  const calcularPosicion = (numeroPuesto, index) => {
     if (!numeroPuesto || index === undefined) {
      return null; // Si no hay número, no calcula posición
    }
    // Buscamos si el puesto existe en nuestra referencia
    const filaEncontrada = MAPA_PUESTOS.find(fila => fila.numeros.includes(numeroPuesto));

    // Separación entre puestos 
    const separacionX = 35; // Distancia horizontal entre puestos
    const separacionY = 30; // Distancia vertical entre filas
    const margen = 20; // Margen desde el borde

    let posX, posY;

    // Si lo encontramos en la referencia, usamos esa posición
    if (filaEncontrada) {
      const indiceEnFila = filaEncontrada.numeros.indexOf(numeroPuesto);
      posX = margen + (indiceEnFila * separacionX);
      posY = margen + (filaEncontrada.fila * separacionY);
    } 
    // Si NO está en la referencia, lo ponemos en una fila automática al final
    else {
      const columna = index % 15; // 15 puestos por fila
      const filaAuto = Math.floor(index / 15) + 1; // Fila extra
      posX = margen + (columna * separacionX);
      posY = margen + (filaAuto * separacionY);
    }

    return { x: posX, y: posY };
  };

  const mapHeight = 700;

  return (
    <div className="home-map-container" ref={containerRef}>
      <div className="map-header">
        <div className="map-title-section">
          <h2>📍 Mercado de Pulgas San Alejo</h2>
          <p className="map-subtitle">
            Haz clic en cualquier puesto para ver su información
          </p>
        </div>
      </div>

      {/* ================== ESTRUCTURA CORREGIDA DEL MAPA ================== */}
      <TransformWrapper
       initialScale={0.6}
       minScale={0.4}
       maxScale={3}
       centerOnInit={true}
       wheel={{ step: 0.1 }}
       doubleClick={{ step: 0.5 }}
       pan={{ velocity: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          /* El div con class map-wrapper envuelve todo */
          <div className="map-wrapper"> 
            
            {/* BOTONES DE ZOOM (Flotando en la esquina) */}
            <div className="map-controls">
              <button onClick={() => zoomIn(0.2)} className="control-btn" title="Acercar" > + </button>
              <button onClick={() => zoomOut(0.2)} className="control-btn" title="Alejar" > - </button>
              <button onClick={() => resetTransform()} className="control-btn" title="Reiniciar" > ⟲ </button>
            </div>

            {/* Contenido del mapa que hace zoom */}
            <TransformComponent
              wrapperStyle={{ 
                width: '100%', 
                height: '100%' 
              }}
              contentStyle={{ 
                width: `100%`, 
                height: `${mapHeight}px`
             }}
            >
              <div
                className="map-grid"
                style={{
                  width: '100%',        // <--- CAMBIO AQUÍ (Usa el 100% del padre)
                  height: `${mapHeight}px`,      // Mantén la altura fija si quieres
                  position: 'relative',
                  background: '#f0f2f5',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'

                }}
              >
                {stands.map((stand, index) => {
                  // Buscamos su posición usando la referencia (o generamos automática si no existe)
                  const pos = calcularPosicion(stand.numero_puesto, index);
                  
                  // Si no tiene posición, no lo dibujamos
                  if (!pos) return null;

                  // Colores según estado
                  const isHovered = hoveredStand?.id_puesto === stand.id_puesto;

                  return (
                    <div
                      key={stand.id_puesto}
                      onClick={() => handleStandClick(stand)}
                      onMouseEnter={() => handleStandHover(stand)}
                      onMouseLeave={handleStandLeave}
                      style={{
                        position: 'absolute',
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        width: '32px',
                        height: '22px',
                        backgroundColor: isHovered ? '#2ecc71' : '#3498db', // Verde al pasar, azul normal
                        border: '1px solid white',
                        borderRadius: '3px',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                      title={stand.negocio?.nombre_negocio || `Puesto ${stand.numero_puesto}`}
                    >
                      {stand.numero_puesto}
                    </div>
                  );
                })}
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
      {/* ================== FIN ESTRUCTURA DEL MAPA ================== */}

      {/* Modal de detalles del puesto */}
      {selectedStand && (
        <ModalProductos
          abierto={showModal}
          onClose={handleCloseModal}
          idNegocio={idNegocio}
          standData={selectedStand}
          isOwner={user && selectedStand.userId === user.id}
          isMapMode={true}
        />
      )}
    </div>
  );
};

export default HomeMap;