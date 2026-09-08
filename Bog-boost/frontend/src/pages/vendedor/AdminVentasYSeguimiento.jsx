import React, { useState, useEffect } from "react";
import { listarVentasNegocio } from "../../api/ventaApi";
import { actualizarSeguimientoApi } from "../../api/seguimientoApi";
import ModalComprobante from "../../components/carrito/ModalComprobante";
import { 
  FaShoppingBag, 
  FaClock, 
  FaSyncAlt, 
  FaTruck, 
  FaCheckCircle, 
  FaFilter, 
  FaPhone, 
  FaMapMarkerAlt,
  FaEye,
  FaTimes,
  FaBoxOpen,
  FaReceipt
} from "react-icons/fa";
import "../../styles/VentasNegocio.css";
import "../../styles/ModalComprobante.css";

const AdminVentasYSeguimiento = () => {
  const [ventas, setVentas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  
  // Estados para los Modales
  const [modalClienteAbierto, setModalClienteAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const [modalComprobanteAbierto, setModalComprobanteAbierto] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  useEffect(() => {
    cargarVentasConSeguimiento();
  }, []);

  const cargarVentasConSeguimiento = async () => {
    try {
      setLoading(true);
      const data = await listarVentasNegocio();
      setVentas(data);
    } catch (error) {
      console.error("Error al cargar las ventas y seguimientos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarEstado = async (id_seguimiento, id_venta, nuevoEstado) => {
    // Si la tabla no tiene un seguimiento creado, el ID para actualizar debe ser el de la venta 
    // o el id_seguimiento si ya existe. Vamos a pasar directamente el id_venta si tu backend lo soporta, 
    // o el id_seguimiento. Con el controlador robusto que hicimos antes, ambos funcionan.
    const idParaEnviar = id_seguimiento || id_venta;

    if (!idParaEnviar) {
      alert("Error: No se encontró un identificador para este pedido.");
      return;
    }

    try {
      console.log(`Cambiando estado de ${idParaEnviar} a ${nuevoEstado}`);
      
      await actualizarSeguimientoApi(idParaEnviar, nuevoEstado);

      // Actualizamos inmediatamente el estado local en la tabla
      setVentas(prevVentas =>
        prevVentas.map(venta => {
          if (venta.id_venta === id_venta) {
            const seguimientoActual = Array.isArray(venta.seguimiento) ? venta.seguimiento[0] : (venta.seguimiento || {});
            return {
              ...venta,
              seguimiento: [{
                ...seguimientoActual,
                estado_seguimiento: nuevoEstado,
                fecha_entrega: nuevoEstado === 'ENTREGADO' ? new Date().toISOString() : seguimientoActual.fecha_entrega
              }]
            };
          }
          return venta;
        })
      );

    } catch (error) {
      console.error("Error al actualizar:", error.response?.data || error.message);
      alert("No se pudo actualizar el estado del pedido.");
    }
  };

      // Opcional: recargar desde la API para asegurar sincronización total con la base de datos

  const abrirModalCliente = (venta) => {
    setClienteSeleccionado(venta);
    setModalClienteAbierto(true);
  };

  const cerrarModalCliente = () => {
    setModalClienteAbierto(false);
    setClienteSeleccionado(null);
  };

  const abrirModalComprobante = (venta) => {
    setVentaSeleccionada(venta);
    setModalComprobanteAbierto(true);
  };

  const cerrarModalComprobante = () => {
    setModalComprobanteAbierto(false);
    setVentaSeleccionada(null);
  };

  // Filtrar ventas por el estado de su seguimiento de forma segura
  const ventasFiltradas = ventas.filter((venta) => {
    const estadoSeg = venta.seguimiento?.[0]?.estado_seguimiento || "PENDIENTE";
    if (filtroEstado === "TODOS") return true;
    return estadoSeg.toUpperCase() === filtroEstado.toUpperCase();
  });

  // Métricas para tarjetas de resumen
  const totalCount = ventas.length;
  const pendientesCount = ventas.filter(v => (v.seguimiento?.[0]?.estado_seguimiento || "PENDIENTE").toUpperCase() === "PENDIENTE").length;
  const preparandoCount = ventas.filter(v => (v.seguimiento?.[0]?.estado_seguimiento || "").toUpperCase() === "PREPARANDO").length;
  const enviadosCount = ventas.filter(v => (v.seguimiento?.[0]?.estado_seguimiento || "").toUpperCase() === "ENVIADO").length;
  const entregadosCount = ventas.filter(v => (v.seguimiento?.[0]?.estado_seguimiento || "").toUpperCase() === "ENTREGADO").length;

  return (
    <div className="movimientos-container">
      <h2 className="titulo-movimientos">Panel de Ventas y Seguimiento de Pedidos</h2>

      {/* Tarjetas Resumen */}
      <div className="movimientos-summary">
        <div className="summary-card">
          <FaShoppingBag />
          <span>Total Ventas<strong>{totalCount}</strong></span>
        </div>
        <div className="summary-card">
          <FaClock style={{ color: "#ff9800" }} />
          <span>Pendientes<strong>{pendientesCount}</strong></span>
        </div>
        <div className="summary-card">
          <FaSyncAlt style={{ color: "#1976d2" }} />
          <span>Preparando<strong>{preparandoCount}</strong></span>
        </div>
        <div className="summary-card">
          <FaTruck style={{ color: "#0288d1" }} />
          <span>Enviados<strong>{enviadosCount}</strong></span>
        </div>
        <div className="summary-card">
          <FaCheckCircle style={{ color: "#4caf50" }} />
          <span>Entregados<strong>{entregadosCount}</strong></span>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="action-bar">
        <div className="filter-group">
          <FaFilter />
          <label htmlFor="filtroEstado">Filtrar estado:</label>
          <select
            id="filtroEstado"
            className="filter-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="TODOS">Todos los estados</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="PREPARANDO">Preparando</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGADO">Entregado</option>
          </select>
        </div>
      </div>

      {/* Tabla Unificada */}
      <div className="table-container">
        {loading ? (
          <div className="sin-datos">Cargando ventas y seguimientos...</div>
        ) : ventasFiltradas.length === 0 ? (
          <div className="sin-datos">No se encontraron ventas registradas.</div>
        ) : (
          <table className="movimientos-table">
            <thead>
              <tr>
                <th>Venta #</th>
                <th>Cliente</th>
                <th>Producto(s) / Detalle</th>
                <th>Total</th>
                <th>Estado Actual</th>
                <th>Acción / Cambiar Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((venta) => {
                const seguimiento = venta.seguimiento?.[0] || {};
                const estadoActual = (seguimiento.estado_seguimiento || "PENDIENTE").toUpperCase();
                
                const detalles = venta.detalle_venta || venta.detalles || venta.items || [];
                const productosTexto = detalles.length > 0 
                  ? detalles.map(d => `${d.cantidad || 1}x ${d.producto?.nombre_producto || d.nombre_producto || "Producto"}`).join(", ")
                  : venta.producto || "Ver comprobante";

                return (
                  <tr key={venta.id_venta}>
                    <td>
                      <strong>#{venta.id_venta}</strong>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button 
                        className="btn-icono-ojo" 
                        onClick={() => abrirModalCliente(venta)}
                        title="Ver información del cliente"
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#1976d2" }}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td>
                      <div className="nombre-producto" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <small style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                          <FaBoxOpen /> {productosTexto}
                        </small>
                        <button 
                          onClick={() => abrirModalComprobante(venta)}
                          title="Ver detalle completo"
                          style={{ background: "#e3f2fd", border: "none", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", color: "#ffa530", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem" }}
                        >
                          <FaReceipt /> Ver
                        </button>
                      </div>
                    </td>
                    <td>
                      <strong>{Number(venta.total || 0).toLocaleString("es-CO", { style: "currency", currency: "COP" })}</strong>
                    </td>
                    <td>
                      <span className={`movimiento-badge ${estadoActual.toLowerCase()}`}>
                        {estadoActual}
                      </span>
                    </td>
                    <td>
                      <select
  className="filter-select"
  value={estadoActual}
  onChange={(e) => handleCambiarEstado(seguimiento.id_seguimiento, venta.id_venta, e.target.value)}
>
  <option value="PENDIENTE">PENDIENTE</option>
  <option value="PREPARANDO">PREPARANDO</option>
  <option value="ENVIADO">ENVIADO</option>
  <option value="ENTREGADO">ENTREGADO</option>
</select>
                    </td>
                    <td>
                      <small>{new Date(venta.fecha_venta).toLocaleString()}</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de Información del Cliente */}
      {modalClienteAbierto && clienteSeleccionado && (
        <div className="modal-overlay" style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div className="modal-content" style={{
            background: "#fff", padding: "25px", borderRadius: "8px", width: "400px", maxWidth: "90%", position: "relative", boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            <button 
              onClick={cerrarModalCliente}
              style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
            >
              <FaTimes />
            </button>
            <h3 style={{ marginBottom: "20px", color: "#333" }}>Información del Cliente</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
              <p><strong>ID de Perfil:</strong> {clienteSeleccionado.id_perfil || "No registrado"}</p>
              <p><strong>Teléfono / Contacto:</strong> <FaPhone /> {clienteSeleccionado.telefono || "No especificado"}</p>
              <p><strong>Dirección de Envío:</strong> <FaMapMarkerAlt /> {clienteSeleccionado.direccion || "No especificada"}</p>
            </div>
            <button 
              onClick={cerrarModalCliente}
              style={{ marginTop: "20px", padding: "8px 16px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Comprobante Reutilizado para el Vendedor / Administrador */}
      {modalComprobanteAbierto && ventaSeleccionada && (
        <ModalComprobante 
          venta={ventaSeleccionada} 
          onClose={cerrarModalComprobante} 
          esVendedor={true} 
        />
      )}
    </div>
  );
};

export default AdminVentasYSeguimiento;