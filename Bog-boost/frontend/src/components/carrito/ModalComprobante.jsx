import React from 'react';
import "../../styles/PerfilNegocio.css"; // Tus estilos globales
import "../../styles/ModalComprobante.css";     // Los estilos específicos del comprobante

const ModalComprobante = ({ venta, onClose }) => {
  if (!venta) return null;

  const detalles = venta.detalle_venta || venta.detalles || venta.items || [];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <div className="modal-header">
          <h2>Comprobante de Compra</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="card-medio">
            <h4>Detalles del pedido #{venta.id_venta}</h4>
            <p><strong>Fecha:</strong> {new Date(venta.created_at).toLocaleDateString()}</p>
            <p><strong>Dirección:</strong> {venta.direccion}</p>
            <p><strong>Método de pago:</strong> {venta.medio_pago?.nombre_medio || "No especificado"}</p>
            <p><strong>Envío:</strong> {venta.metodo_envio?.nombre_metodo || "No especificado"}</p>
          </div>

          <table className="tabla-comprobante">
            <thead>
              <tr>
                <th>Producto</th>
                <th style={{textAlign: 'center'}}>Cant</th>
                <th style={{textAlign: 'right'}}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(detalles) ? detalles : []).map((d, index) => (
                <tr key={d.id_detalle || index}>
                  <td>{d.producto?.nombre_producto || "Producto"}</td>
                  <td style={{textAlign: 'center'}}>{d.cantidad || 0}</td>
                  <td style={{textAlign: 'right'}}>
                    {Number(d.subtotal || 0).toLocaleString("es-CO", { style: "currency", currency: "COP" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-seccion">
            Total: {Number(venta.total || 0).toLocaleString("es-CO", { style: "currency", currency: "COP" })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-orange" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn-green" onClick={() => window.print()}>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComprobante;