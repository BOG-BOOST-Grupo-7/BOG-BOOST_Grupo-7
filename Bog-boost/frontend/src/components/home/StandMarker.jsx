// ============================================
// COMPONENTE MARCADOR DE PUESTO
// ============================================

import React from 'react';
import './StandMarker.css';

const StandMarker = ({
  stand,
  standsAtPosition,
  onClick,
  onHover,
  onLeave,
  isHovered,
  isUserStand
}) => {
  // ============================================
  // MANEJADORES DE EVENTOS
  // ============================================

  const handleMouseEnter = () => {
    if (onHover) onHover(stand);
  };

  const handleMouseLeave = () => {
    if (onLeave) onLeave();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(stand);
  };

  // ============================================
  // FUNCIONES DE ESTILOS - COMBINADAS
  // ============================================

  const getStandColor = () => {
    // 1. Si es el puesto del usuario
    if (isUserStand) return '#8e44ad'; // Morado
    
    // 2. Si está ocupado pero no es del usuario
    if (!stand.isAvailable) return '#e74c3c'; // Rojo
    
    // 3. Si está disponible
    if (stand.isAvailable) return '#2ecc71'; // Verde
    
    // 4. Color por sección (fallback)
    switch (stand.section) {
      case 'Museo de Arte Moderno':
        return '#3498db'; // Azul
      case 'Sección Principal':
        return '#27ae60'; // Verde oscuro
      case 'Sección Oeste':
        return '#e67e22'; // Naranja
      case 'Sección Norte':
        return '#9b59b6'; // Púrpura
      case 'Sección Sur':
        return '#1abc9c'; // Turquesa
      case 'Esquina':
        return '#f1c40f'; // Amarillo
      default:
        // Puestos destacados (múltiplos de 7)
        if (stand.id % 7 === 0) return '#e74c3c';
        // Puestos especiales (múltiplos de 5)
        if (stand.id % 5 === 0) return '#f39c12';
        return '#95a5a6'; // Gris
    }
  };

  // ============================================
  // ICONO SEGÚN ESTADO
  // ============================================

  const getStandIcon = () => {
    if (isUserStand) return '👤';
    if (!stand.isAvailable) return '🔴';
    if (stand.isAvailable) return '🟢';
    
    // Iconos por sección (fallback)
    const icons = {
      'Museo de Arte Moderno': '🎨',
      'Sección Principal': '🏪',
      'Sección Oeste': '🛍️',
      'Sección Norte': '📚',
      'Sección Sur': '🌿',
      'Esquina': '🍽️'
    };
    return icons[stand.section] || '📍';
  };

  // ============================================
  // VERIFICAR SI ESTÁ AGRUPADO
  // ============================================

  const isGrouped = standsAtPosition && standsAtPosition.length > 1;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div
      className={`
        stand-marker 
        ${isHovered ? 'hovered' : ''} 
        ${isGrouped ? 'grouped' : ''} 
        ${isUserStand ? 'user-stand' : ''}
        ${!stand.isAvailable ? 'occupied' : 'available'}
      `}
      style={{
        left: `${stand.coordinates.x * 50 + 25}px`,
        top: `${stand.coordinates.y * 50 + 25}px`,
        width: isHovered ? '55px' : '40px',
        height: isHovered ? '55px' : '40px',
        backgroundColor: getStandColor(),
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* ============================================
          NÚMERO DEL PUESTO
      ============================================ */}
      <span className="stand-number">{stand.number}</span>

      {/* ============================================
          ESTADO DEL PUESTO (VERDE/ROJO/MORADO)
      ============================================ */}
      <span className="stand-status">{getStandIcon()}</span>

      {/* ============================================
          BADGE DE AGRUPAMIENTO
      ============================================ */}
      {isGrouped && (
        <span className="group-badge">{standsAtPosition.length}</span>
      )}

      {/* ============================================
          TOOLTIP EN HOVER
      ============================================ */}
      {(isHovered) && (
        <div className="stand-tooltip">
          <div className="tooltip-content">
            {/* Número del puesto */}
            <strong>Puesto #{stand.number}</strong>

            {/* Propietario o estado */}
            <span className={`tooltip-owner ${stand.isAvailable ? 'available-text' : 'occupied-text'}`}>
              {stand.isAvailable ? '✅ Disponible' : `👤 ${stand.owner}`}
            </span>

            {/* Productos (si está ocupado) */}
            {!stand.isAvailable && stand.products?.length > 0 && (
              <span className="tooltip-products">
                📦 {stand.products.slice(0, 3).join(', ')}
                {stand.products.length > 3 && '...'}
              </span>
            )}

            {/* Precio (si está disponible) */}
            {stand.isAvailable && (
              <span className="tooltip-price">
                💰 ${stand.price?.toLocaleString() || '0'}/mes
              </span>
            )}

            {/* Sección */}
            <span className="tooltip-section">
              📍 {stand.section}
            </span>

            {/* Tamaño del puesto */}
            {stand.size && (
              <span className="tooltip-size">
                📐 {stand.size}
              </span>
            )}

            {/* Badge de usuario dueño */}
            {isUserStand && (
              <span className="tooltip-user">✨ Tu puesto</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StandMarker;