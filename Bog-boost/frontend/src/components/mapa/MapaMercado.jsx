import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Puesto from './Puesto';
import ModalInfoPuesto from './ModalInfoPuesto';
import TODOS_LOS_PUESTOS from './DatosPuestos';
import './MapaMercado.css';

const MapaMercado = () => {
  const [puestoDatos, setPuestoDatos] = useState(null); // ← Guarda los datos del backend
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Función para consultar la API al hacer clic en un puesto
  const abrirModal = async (numeroPuesto) => {
    setModalAbierto(true);
    setCargando(true);
    setPuestoDatos(null);

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/mapa/puesto/${numeroPuesto}`
      );
      const datos = await respuesta.json();
      setPuestoDatos(datos); 
    } catch (error) {
      setPuestoDatos({
        error: true,
        mensaje: "Error al consultar el puesto"
      });
    }

    setCargando(false);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPuestoDatos(null);
  };

  return (
    <div className="contenedor-mapa">
      <h2>🗺️ Mapa del Mercado de Pulgas San Alejo</h2>
      <p className="leyenda">
        📍 Entrada Principal: Cra 7 • Salida: Calle 24 • Referencias:
        Planetario Distrital | Museo de Arte Moderno | Monserrate | Torre Colpatria
      </p>

      <TransformWrapper
        initialScale={0.8}
        minScale={0.4}
        maxScale={2}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controles de Zoom */}
            <div className="controles-zoom">
              <button onClick={zoomIn}>🔍 Acercar</button>
              <button onClick={zoomOut}>🔎 Alejar</button>
              <button onClick={resetTransform}>↺ Restablecer</button>
            </div>

            {/* Área del Mapa */}
            <TransformComponent>
              <div className="plano-mapa">
                <svg width="1000" height="950" className="svg-mapa">
                  {/* Fondo */}
                  <rect x="0" y="0" width="1000" height="950" fill="#fef9e7" stroke="#d4ac0d" strokeWidth="3"/>
                  
                  {/* Etiquetas para los lugares de Referencia */}
                  <text x="30" y="60" className="etiqueta-referencia">PLANETARIO DISTRITAL</text>
                  <text x="320" y="90" className="etiqueta-referencia">MUSEO DE ARTE MODERNO</text>
                  <text x="740" y="55" className="etiqueta-referencia">MONSERRATE</text>
                  <text x="320" y="910" className="etiqueta-referencia">TORRE COLPATRIA</text>
                  <text x="430" y="935" className="etiqueta-entrada">⬇️ ENTRADA Cra 7</text>
                  <text x="955" y="420" className="etiqueta-entrada">⬅️ SALIDA Calle 24</text>

                  {/* Dibujar todos los puestos */}
                  {TODOS_LOS_PUESTOS.map((puesto) => (
                    <Puesto
                      key={puesto.numero}
                      numero={puesto.numero}
                      x={puesto.x}
                      y={puesto.y}
                      alHacerClick={abrirModal}
                    />
                  ))}
                </svg>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/*  Los datos se pasan al modal  */}
      <ModalInfoPuesto
        abierto={modalAbierto}
        alCerrar={cerrarModal}
        cargando={cargando}
        datosPuesto={puestoDatos}
      />
    </div>
  );
};

export default MapaMercado;