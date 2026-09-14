// Este archivo esta para crear las casillas de los puestos 
import React from 'react';
import './Puesto.css';

const Puesto = ({ numero, x, y, alHacerClick }) => {
  return (
    <g className="puesto-en-mapa" onClick={() => alHacerClick(numero)}>
      {/* Cuadro del puesto */}
      <rect
        x={x - 22}
        y={y - 12}
        width="44"
        height="24"
        fill="#fff8dc"
        stroke="#b8860b"
        strokeWidth="1.5"
        rx="3"
        className="puesto-casilla"
      />
      {/* Número del puesto */}
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        fill="#333"
        className="numero-puesto"
      >
        {numero}
      </text>
    </g>
  );
};

export default Puesto;