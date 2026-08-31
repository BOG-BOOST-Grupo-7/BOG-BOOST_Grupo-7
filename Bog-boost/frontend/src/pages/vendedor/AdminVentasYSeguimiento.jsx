import React, { useState, useEffect } from "react";
import { listarVentasNegocio } from "../../api/ventaApi";
import { actualizarSeguimientoApi } from "../../api/seguimientoApi";
import { 
  FaShoppingBag, 
  FaClock, 
  FaSyncAlt, 
  FaTruck, 
  FaCheckCircle, 
  FaFilter, 
  FaPhone, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import "../../styles/VentasNegocio.css";

const AdminVentasYSeguimiento = () => {
  const [ventas, setVentas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [loading, setLoading] = useState(true);

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
    const idParaActualizar = id_seguimiento || id_venta;
    
    if (!idParaActualizar) {
      alert("Error: Este registro no tiene un ID de seguimiento ni de venta asociado.");
      return;
    }

    try {
      const respuesta = await actualizarSeguimientoApi(idParaActualizar, nuevoEstado);

      // Actualizar el estado localmente de inmediato
      setVentas(prev =>
        prev.map(v => {
          if (v.id_venta === id_venta) {
            const segActual = v.seguimiento?.[0] || {};
            return {
              ...v,
              seguimiento: [{ 
                ...segActual, 
                id_seguimiento: segActual.id_seguimiento || idParaActualizar,
                estado_seguimiento: nuevoEstado, 
                fecha_entrega: nuevoEstado === 'ENTREGADO' ? new Date().toISOString() : segActual.fecha_entrega 
              }]
            };
          }
          return v;
        })
      );
    } catch (error) {
      console.error("Error detallado al actualizar el estado:", error.response?.data || error.message);
      alert(`No se pudo actualizar el estado: ${error.response?.data?.mensaje || error.message}`);
    }
  };

  // Filtrar ventas por el estado de su seguimiento de forma segura
  const ventasFiltradas = ventas.filter((venta) => {
    const estadoSeg = venta.seguimiento?.[0]?.estado_seguimiento || "PENDIENTE";
    if (filtroEstado === "TODOS") return true;
    return estadoSeg === filtroEstado;
  });

  // Métricas para tarjetas de resumen
  const totalCount = ventas.length;
  const pendientesCount = ventas.filter(v => (v.seguimiento?.[0]?.estado_seguimiento || "PENDIENTE") === "PENDIENTE").length;
  const preparandoCount = ventas.filter(v => v.seguimiento?.[0]?.estado_seguimiento === "PREPARANDO").length;
  const enviadosCount = ventas.filter(v => v.seguimiento?.[0]?.estado_seguimiento === "ENVIADO").length;
  const entregadosCount = ventas.filter(v => v.seguimiento?.[0]?.estado_seguimiento === "ENTREGADO").length;

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
                <th>Cliente / Contacto</th>
                <th>Dirección</th>
                <th>Total</th>
                <th>Estado Actual</th>
                <th>Acción / Cambiar Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((venta) => {
                const seguimiento = venta.seguimiento?.[0] || {};
                const estadoActual = seguimiento.estado_seguimiento || "PENDIENTE";

                return (
                  <tr key={venta.id_venta}>
                    <td>
                      <strong>#{venta.id_venta}</strong>
                    </td>
                    <td>
                      <div className="nombre-producto">
                        <strong>ID: {venta.id_perfil?.slice(0, 8)}...</strong>
                        <small><FaPhone /> {venta.telefono}</small>
                      </div>
                    </td>
                    <td>
                      <div className="nombre-producto">
                        <small><FaMapMarkerAlt /> {venta.direccion}</small>
                      </div>
                    </td>
                    <td>
                      <strong>${Number(venta.total).toLocaleString()}</strong>
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
    </div>
  );
};

export default AdminVentasYSeguimiento;