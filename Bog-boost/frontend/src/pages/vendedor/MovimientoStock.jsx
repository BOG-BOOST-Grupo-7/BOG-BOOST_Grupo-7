import { useEffect, useMemo, useState } from "react";

import {
  FaBoxes,
  FaArrowDown,
  FaArrowUp,
  FaTools,
  FaFilter
} from "react-icons/fa";

import { listarMovimientos, getNegocioUsuario} from "../../api/movimientoStockApi";

import "../../styles/MovimientoStock.css";

function AdminMovimientoStock() {
  const [movimientos, setMovimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tipoFiltro, setTipoFiltro] = useState("TODOS");
  const [id_negocio, setIdNegocio] = useState(null);


  // Cargar movimientos
  // ==========================
  useEffect(() => {
    const inicializar = async () => {
      try {
        const perfil = JSON.parse(localStorage.getItem("perfil") || "{}");
        if (perfil.id_perfil) {
          const { data } = await getNegocioUsuario(perfil.id_perfil);
          setIdNegocio(data.id_negocio);
        } else {
          setIdNegocio(10); // Fallback por seguridad
        }
      } catch (error) {
        console.error("Error obteniendo negocio:", error);
        setIdNegocio(10);
      }
    };
    inicializar();
  }, []);

  // 2. Cargar movimientos solo cuando ya tenemos el id_negocio
  const cargarMovimientos = async () => {
    if (!id_negocio) return;
    try {
      const { data } = await listarMovimientos(id_negocio);
      setMovimientos(data);
    } catch (error) {
      console.error(error);
      alert("No fue posible cargar los movimientos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (id_negocio) cargarMovimientos();
  }, [id_negocio]);

  // ==========================
  // Filtrar movimientos
  // ==========================
  const movimientosFiltrados = useMemo(() => {
    if (tipoFiltro === "TODOS") {
      return movimientos;
    }
    return movimientos.filter(
      (movimiento) => movimiento.tipo_movimiento === tipoFiltro
    );
  }, [movimientos, tipoFiltro]);

  // ==========================
  // Resumen
  // ==========================
  const total = movimientos.length;
  const entradas = movimientos.filter((m) => m.tipo_movimiento === "ENTRADA").length;
  const salidas = movimientos.filter((m) => m.tipo_movimiento === "SALIDA").length;
  const ajustes = movimientos.filter((m) => m.tipo_movimiento === "AJUSTE").length;

  // ==========================
  // Badge tipo
  // ==========================
  const obtenerClaseTipo = (tipo) => {
    switch (tipo) {
      case "ENTRADA":
        return "movimiento-badge entrada";
      case "SALIDA":
        return "movimiento-badge salida";
      default:
        return "movimiento-badge ajuste";
    }
  };

  return (
    <div className="movimientos-container">
      <div className="lista-movimientos">
        <h1 className="titulo-movimientos">Movimientos de Stock</h1>

        {/* ==========================
            Tarjetas resumen
        ========================== */}
        <div className="movimientos-summary">
          <div className="summary-card">
            <FaBoxes />
            <span>
              Total Movimientos
              <strong>{total}</strong>
            </span>
          </div>

          <div className="summary-card">
            <FaArrowDown />
            <span>
              Entradas
              <strong>{entradas}</strong>
            </span>
          </div>

          <div className="summary-card">
            <FaArrowUp />
            <span>
              Salidas
              <strong>{salidas}</strong>
            </span>
          </div>

          <div className="summary-card">
            <FaTools />
            <span>
              Ajustes
              <strong>{ajustes}</strong>
            </span>
          </div>
        </div>

        {/* ==========================
            Barra de filtros
        ========================== */}
        <div className="action-bar">
          <div className="filter-group">
            <FaFilter />
            <label>Filtrar</label>
            <select
              className="filter-select"
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
            >
              <option value="TODOS">Todos</option>
              <option value="ENTRADA">Entradas</option>
              <option value="SALIDA">Salidas</option>
              <option value="AJUSTE">Ajustes</option>
            </select>
          </div>
        </div>

        {/* ==========================
            Tabla
        ========================== */}
        <div className="table-container">
          <table className="movimientos-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Motivo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="5" className="sin-datos">
                    Cargando...
                  </td>
                </tr>
              ) : movimientosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="sin-datos">
                    No hay movimientos registrados.
                  </td>
                </tr>
              ) : (
                movimientosFiltrados.map((movimiento) => (
                  <tr key={movimiento.id_movimiento}>
                    <td>
                      <div className="nombre-producto">
                        <strong>
                          {movimiento.producto?.nombre_producto || "Producto eliminado"}
                        </strong>
                        <small>ID: {movimiento.id_producto}</small>
                      </div>
                    </td>
                    <td>
                      <span className={obtenerClaseTipo(movimiento.tipo_movimiento)}>
                        {movimiento.tipo_movimiento}
                      </span>
                    </td>
                    <td>{movimiento.cantidad_productos}</td>
                    <td>{movimiento.motivo || "Sin motivo"}</td>
                    <td>
                      {new Date(movimiento.fecha_movimiento).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminMovimientoStock;