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
  // FUNCIONES DE ESTILOS
  // ============================================

  const getStandColor = () => {
    if (isUserStand) return '#8e44ad';
    
    switch (stand.section) {
      case 'Museo de Arte Moderno':
        return '#3498db';
      case 'Sección Principal':
        return '#2ecc71';
      case 'Sección Oeste':
        return '#e67e22';
      case 'Sección Norte':
        return '#9b59b6';
      case 'Sección Sur':
        return '#27ae60';
      case 'Esquina':
        return '#e74c3c';
      default:
        if (stand.id % 7 === 0) return '#e74c3c';
        if (stand.id % 5 === 0) return '#f39c12';
        return '#2ecc71';
    }
  };

  const getStandIcon = () => {
    if (isUserStand) return '👤';
    
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
      `}
      style={{
        left: `${stand.coordinates.x * 50 + 25}px`,
        top: `${stand.coordinates.y * 50 + 25}px`,
        width: isHovered ? '55px' : '40px',
        height: isHovered ? '55px' : '40px',
        backgroundColor: getStandColor(),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span className="stand-icon">{getStandIcon()}</span>
      <span className="stand-number">{stand.number}</span>
      
      {isGrouped && (
        <span className="group-badge">{standsAtPosition.length}</span>
      )}
      
      {(isHovered) && (
        <div className="stand-tooltip">
          <div className="tooltip-content">
            <strong>Puesto #{stand.number}</strong>
            <span className="tooltip-owner">{stand.owner}</span>
            <span className="tooltip-products">
              {stand.products?.slice(0, 2).join(', ')}
              {stand.products?.length > 2 && '...'}
            </span>
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