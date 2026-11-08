// src/Presentation/views/mapa/MapaSVG.jsx
import React from "react";
import Svg, { Rect, Text as SvgText, G } from "react-native-svg";

const ANCHO_MAPA = 2000;
const ALTO_MAPA = 1200;

export default function MapaSVG({ puestos, obtenerNegocio, alHacerClicPuesto }) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${ANCHO_MAPA} ${ALTO_MAPA}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Fondo blanco */}
      <Rect x="0" y="0" width={ANCHO_MAPA} height={ALTO_MAPA} fill="#ffffff" />

      {/* ============ REFERENCIAS VISUALES ============ */}
      {/* Monserrate */}
      <G transform="translate(1180, 5)">
        <SvgText
          x="60"
          y="30"
          textAnchor="middle"
          fontSize="60"
          fill="#333"
        >
          ⛪
        </SvgText>
        <SvgText
          x="60"
          y="70"
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#333"
        >
          MONSERRATE
        </SvgText>
      </G>

      {/* Museo de Arte Moderno */}
      <G transform="translate(580, 20)">
        <SvgText x="60" y="30" textAnchor="middle" fontSize="60">
          🏛️
        </SvgText>
        <SvgText x="60" y="60" textAnchor="middle" fontSize="12" fontWeight="bold">
          MUSEO DE ARTE MODERNO
        </SvgText>
      </G>

      {/* Planetario */}
      <G transform="translate(80, 420)">
        <SvgText x="45" y="20" textAnchor="middle" fontSize="60">
          🪐
        </SvgText>
        <SvgText x="45" y="50" textAnchor="middle" fontSize="11" fontWeight="bold">
          PLANETARIO
        </SvgText>
        <SvgText x="45" y="65" textAnchor="middle" fontSize="11" fontWeight="bold">
          DISTRITAL
        </SvgText>
      </G>

      {/* Torre Colpatria */}
      <G transform="translate(490, 940)">
        <SvgText x="60" y="15" textAnchor="middle" fontSize="60">
          🏢
        </SvgText>
        <SvgText x="60" y="50" textAnchor="middle" fontSize="11" fontWeight="bold">
          TORRE COLPATRIA
        </SvgText>
      </G>

      {/* Aseo */}
      <Rect x="1595" y="238" width="60" height="30" fill="#000" />
      <SvgText
        x="1625"
        y="258"
        fontSize="11"
        fontWeight="bold"
        fill="#fff"
        textAnchor="middle"
      >
        ASEO
      </SvgText>

      {/* Entrada Calle 24 */}
      <SvgText
        x="1750"
        y="220"
        fontSize="12"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(90 1750 220)"
      >
        ENTRADA Calle 24
      </SvgText>

      {/* Bloque de comidas */}
      <G transform="translate(440, 640)">
        <Rect x="0" y="0" width="260" height="220" fill="#000" />
        <SvgText x="130" y="110" textAnchor="middle" fontSize="30" fill="#fff">
          🚲
        </SvgText>
        <SvgText x="240" y="50" textAnchor="middle" fontSize="9" fill="#fff">
          CARNE
        </SvgText>
        <SvgText x="240" y="75" textAnchor="middle" fontSize="9" fill="#fff">
          LECHONA
        </SvgText>
        <SvgText x="165" y="50" textAnchor="middle" fontSize="9" fill="#fff">
          VINOS
        </SvgText>
        <SvgText x="165" y="75" textAnchor="middle" fontSize="9" fill="#fff">
          SAPICON
        </SvgText>
      </G>

      {/* Baños */}
      <G transform="translate(1150, 990)">
        <Rect x="0" y="0" width="60" height="26" fill="#fff" stroke="#000" strokeWidth="1.2" />
        <SvgText
          x="30"
          y="17"
          fill="#000"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
        >
          BAÑOS
        </SvgText>
      </G>

      {/* Entrada Cra 7 */}
      <SvgText
        x="1080"
        y="1050"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
      >
        ENTRADA Cra 7
      </SvgText>

      {/* ============ PUESTOS DINÁMICOS ============ */}
      <G>
        {puestos.map((puesto) => {
          const numPuesto = puesto.numero_puesto || puesto.numero;
          const negocio = obtenerNegocio(numPuesto);
          const esOcupado = Boolean(negocio);

          const posX = Number(puesto.x) || 400;
          const posY = Number(puesto.y) || 300;
          const ancho = Number(puesto.ancho) || 40;
          const alto = Number(puesto.alto) || 30;

          return (
            <G
              key={String(numPuesto)}
              onPress={() =>
                alHacerClicPuesto({ ...puesto, numero: numPuesto, negocio })
              }
            >
              <Rect
                x={posX}
                y={posY}
                width={ancho}
                height={alto}
                rx="1"
                fill={esOcupado ? "#f39c12" : "#ffffff"}
                stroke={esOcupado ? "#d35400" : "#333333"}
                strokeWidth="1"
              />
              <SvgText
                x={posX + ancho / 2}
                y={posY + alto / 2 + 4}
                fontSize="12"
                fontWeight="bold"
                fill={esOcupado ? "#ffffff" : "#000000"}
                textAnchor="middle"
              >
                {String(numPuesto)}
              </SvgText>
            </G>
          );
        })}
      </G>
    </Svg>
  );
}