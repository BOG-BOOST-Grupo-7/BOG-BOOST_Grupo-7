import React from 'react';
import './ModalDetallePuesto.css';

export const ModalDetallePuesto = ({ isOpen, onClose, stand }) => {
  if (!isOpen || !stand) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Puesto #{stand.number}</h2>
          <span className="section-badge">{stand.section}</span>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <h3>👤 Propietario</h3>
            <p>{stand.owner}</p>
          </div>

          <div className="info-section">
            <h3>📦 Productos</h3>
            <ul className="products-list">
              {stand.products?.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>

          {stand.description && (
            <div className="info-section">
              <h3>📝 Descripción</h3>
              <p>{stand.description}</p>
            </div>
          )}

          {stand.history && (
            <div className="info-section">
              <h3>📖 Historia</h3>
              <p>{stand.history}</p>
            </div>
          )}

          {stand.rating && (
            <div className="info-section">
              <h3>⭐ Calificación</h3>
              <div className="rating">
                {'★'.repeat(Math.round(stand.rating))}
                {'☆'.repeat(5 - Math.round(stand.rating))}
                <span className="rating-number">{stand.rating}</span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};