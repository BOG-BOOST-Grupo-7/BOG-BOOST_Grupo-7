// Este archivo es para crear el mapa 

import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Puesto from './Puesto';
import ModalInfoPuesto from './ModalInfoPuesto';
import TODOS_LOS_PUESTOS from './DatosPuestos';
import './MapaMercado.css';

const MapaMercado = () => {
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = (numeroPuesto) => {
    setPuestoSeleccionado(numeroPuesto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPuestoSeleccionado(null);
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

                  {/* Etiquetas de Referencia */}
                  <text x="30" y="60" className="etiqueta-referencia">PLANETARIO DISTRITAL</text>
                  <text x="320" y="90" className="etiqueta-referencia">MUSEO DE ARTE MODERNO</text>
                  <text x="740" y="55" className="etiqueta-referencia">MONSERRATE</text>
                  <text x="320" y="910" className="etiqueta-referencia">TORRE COLPATRIA</text>
                  <text x="430" y="935" className="etiqueta-entrada">⬇️ ENTRADA Cra 7</text>
                  <text x="955" y="420" className="etiqueta-entrada">⬅️ SALIDA Calle 24</text>

                  {/* Dibujar TODOS los puestos */}
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

      {/* Modal */}
      <ModalInfoPuesto
        abierto={modalAbierto}
        alCerrar={cerrarModal}
        numeroPuesto={puestoSeleccionado}
      />
    </div>
  );
};

export default MapaMercado;