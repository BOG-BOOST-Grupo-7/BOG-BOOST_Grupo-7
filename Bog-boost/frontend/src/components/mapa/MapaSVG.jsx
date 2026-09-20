const MapaSVG = ({ puestos, obtenerNegocio, alHacerClicPuesto }) => {
  return (
    <svg
      className="mapa-svg"
      viewBox="0 0 2100 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="2100" height="1000" fill="#ffffff" />

      {/* ================================================ */}
      {/* REFERENCIAS VISUALES */}
      {/* ================================================ */}

      {/* MUSEO DE ARTE MODERNO — mueve a la izquierda junto al bloque azul */}
<g transform="translate(580, 20)">
  <text x="60" y="30" textAnchor="middle" fontSize="32">🏛️</text>
  <text x="60" y="55" className="label-ref" textAnchor="middle">
    MUSEO DE
  </text>
  <text x="60" y="68" className="label-ref" textAnchor="middle">
    ARTE MODERNO
  </text>
</g>

{/* MONSERRATE — se queda igual, arriba de los puestos 34-31 */}
<g transform="translate(1180, 5)">
  <text x="60" y="30" textAnchor="middle" fontSize="34">⛪</text>
  <text x="60" y="55" className="label-ref-lg" textAnchor="middle">
    MONSERRATE
  </text>
</g>

{/* PLANETARIO — mueve a la izquierda junto al bloque azul */}
<g transform="translate(150, 420)">
  <text x="45" y="20" textAnchor="middle" fontSize="30">🪐</text>
  <text x="45" y="45" className="label-ref-sm" textAnchor="middle">
    PLANETARIO
  </text>
  <text x="45" y="60" className="label-ref-sm" textAnchor="middle">
    DISTRITAL
  </text>
</g>

{/* TORRE COLPATRIA — ajusta según el nuevo bloque azul */}
<g transform="translate(490, 940)">
  <text x="60" y="15" textAnchor="middle" fontSize="26">🏙️</text>
  <text x="60" y="38" className="label-ref-sm" textAnchor="middle">
    TORRE
  </text>
  <text x="60" y="52" className="label-ref-sm" textAnchor="middle">
    COLPATRIA
  </text>
</g>

{/* ASEO — al lado derecho del puesto 24 */}
<rect x="1555" y="238" width="60" height="30" fill="#000" />
<text
  x="1585"
  y="258"
  fill="#fff"
  fontSize="11"
  fontWeight="bold"
  textAnchor="middle"
  fontFamily="Arial"
>
  ASEO
</text>

{/* ENTRADA Calle 24 — se mueve a la izquierda */}
<text
  x="1800"
  y="220"
  className="label-ref"
  textAnchor="middle"
  transform="rotate(90 1800 220)"
>
  ENTRADA Calle 24
</text>

{/* Zona bicicletas — se mueve junto al bloque azul */}
<g transform="translate(430, 620)">
  <rect x="0" y="0" width="260" height="220" fill="#000" />
  <text x="130" y="110" textAnchor="middle" fontSize="56" fill="#fff">🚲</text>
  {/* textos del panel... */}
</g>

{/* BAÑOS — se mueve a la izquierda */}
<g transform="translate(1000, 900)">
  <rect x="0" y="0" width="60" height="26" fill="#fff" stroke="#000" strokeWidth="1.2" />
  <text x="30" y="17" fill="#000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Arial">
    BAÑOS
  </text>
  <text x="80" y="20" textAnchor="middle" fontSize="16">👨‍👩</text>
</g>

{/* ENTRADA Cra 7 */}
<text x="780" y="985" className="label-ref-lg" textAnchor="middle">
  ENTRADA Cra 7
</text>  

      {/* ================================================ */}
      {/* PUESTOS */}
      {/* ================================================ */}
      <g className="grupo-puestos">
        {puestos.map((puesto) => {
          const negocio = obtenerNegocio(puesto.numero);
          const esOcupado = Boolean(negocio) || puesto.estado === 'ocupado';
          return (
            <g
              key={puesto.numero}
              className={`puesto-svg ${esOcupado ? 'ocupado' : 'disponible'}`}
              onClick={() => alHacerClicPuesto({ ...puesto, negocio })}
            >
              <title>
                Puesto {puesto.numero} — {esOcupado ? 'Ocupado' : 'Disponible'}
              </title>
              <rect
                x={puesto.x}
                y={puesto.y}
                width={puesto.ancho}
                height={puesto.alto}
                rx="1"
              />
              <text
                x={puesto.x + puesto.ancho / 2}
                y={puesto.y + puesto.alto / 2}
                className="texto-p"
              >
                {puesto.numero}
              </text>
            </g>
          );
        })}
      </g>

      <style>{`
        .puesto-svg { cursor: pointer; }
        .puesto-svg rect {
          fill: #ffffff;
          stroke: #333333;
          stroke-width: 1;
          transition: fill 0.2s, stroke 0.2s;
        }
        .puesto-svg.disponible:hover rect {
          fill: #FFF3CD;
          stroke: #F39C12;
          stroke-width: 1.8;
        }
        .puesto-svg.ocupado rect {
          fill: #F39C12;
          stroke: #D35400;
          stroke-width: 1.8;
        }
        .puesto-svg.ocupado:hover rect {
          fill: #E67E22;
          stroke: #D35400;
          stroke-width: 2;
        }
        .texto-p {
          font-size: 12px;
          font-weight: bold;
          fill: #000;
          text-anchor: middle;
          dominant-baseline: middle;
          pointer-events: none;
          user-select: none;
          font-family: Arial, sans-serif;
        }
        .puesto-svg.ocupado .texto-p { fill: #fff; }
        .label-ref-sm {
          font-size: 11px;
          font-weight: bold;
          fill: #333;
          font-family: Arial, sans-serif;
        }
        .label-ref {
          font-size: 13px;
          font-weight: bold;
          fill: #333;
          font-family: Arial, sans-serif;
        }
        .label-ref-lg {
          font-size: 16px;
          font-weight: bold;
          fill: #222;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </svg>
  );
};

export default MapaSVG;