import { useEffect, useMemo, useState } from "react";
import {
    FaStore,
    FaTags,
    FaPlusCircle,
    FaUndo,
    FaEye,
    FaBoxOpen,
    FaSearch,
} from "react-icons/fa";

import ModalCategorias from "../../components/ModalCategorias";
import "../../styles/ListaNegociosAdmin.css";
import { obtenerNegocios, obtenerNegocioPorId } from "../../api/negocioApi";

function ListaNegociosAdmin() {
    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoriaFiltro, setCategoriaFiltro] = useState("todos");
    const [busqueda, setBusqueda] = useState("");
    const [negocioSeleccionado, setNegocioSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);

    // Paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 5;

    useEffect(() => {
        cargarNegocios();
    }, []);

    const cargarNegocios = async () => {
        try {
            setLoading(true);
            const respuesta = await obtenerNegocios();
            const negociosAprobados = respuesta.filter(
                (negocio) => negocio.estado_negocio === "APROBADO"
            );
            setNegocios(negociosAprobados);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar los negocios.");
        } finally {
            setLoading(false);
        }
    };

    const nombrePropietario = (perfil) => {
        if (!perfil) return "No disponible";
        return [
            perfil.primer_nombre,
            perfil.segundo_nombre,
            perfil.primer_apellido,
            perfil.segundo_apellido,
        ]
            .filter(Boolean)
            .join(" ");
    };

    const categorias = useMemo(() => {
        const lista = new Set();
        negocios.forEach((negocio) => {
            if (negocio.categoria?.nombre_categoria) {
                lista.add(negocio.categoria.nombre_categoria);
            }
        });
        return [...lista];
    }, [negocios]);

    // Filtrado para incluir nombre del negocio, correo y propietario
    const negociosFiltrados = useMemo(() => {
        return negocios.filter((negocio) => {
            const cumpleCategoria =
                categoriaFiltro === "todos" ||
                negocio.categoria?.nombre_categoria === categoriaFiltro;

            const textoBusqueda = busqueda.toLowerCase().trim();
            const nombreNegocio = (negocio.nombre_negocio || "").toLowerCase();
            const correoPropietario = (negocio.perfil?.correo || "").toLowerCase();
            const nombreCompletoPropietario = nombrePropietario(negocio.perfil).toLowerCase();

            const cumpleBusqueda =
                textoBusqueda === "" ||
                nombreNegocio.includes(textoBusqueda) ||
                correoPropietario.includes(textoBusqueda) ||
                nombreCompletoPropietario.includes(textoBusqueda);

            return cumpleCategoria && cumpleBusqueda;
        });
    }, [negocios, categoriaFiltro, busqueda]);

    // Calcular datos paginados
    const totalPaginas = Math.ceil(negociosFiltrados.length / elementosPorPagina) || 1;
    const negociosPaginados = useMemo(() => {
        const inicio = (paginaActual - 1) * elementosPorPagina;
        return negociosFiltrados.slice(inicio, inicio + elementosPorPagina);
    }, [negociosFiltrados, paginaActual]);

    // Resetear a la página 1 cuando cambia el filtro o la búsqueda
    useEffect(() => {
        setPaginaActual(1);
    }, [categoriaFiltro, busqueda]);

    const totalNegocios = negociosFiltrados.length;

    const totalCategorias = useMemo(() => {
        const lista = new Set();
        negocios.forEach((negocio) => {
            if (negocio.categoria?.nombre_categoria) {
                lista.add(negocio.categoria.nombre_categoria);
            }
        });
        return lista.size;
    }, [negocios]);

    const totalProductos = useMemo(() => {
        return negocios.reduce(
            (total, negocio) => total + (negocio.productos?.length || 0),
            0
        );
    }, [negocios]);

    const limpiarFiltros = () => {
        setCategoriaFiltro("todos");
        setBusqueda("");
    };

    const verNegocio = async (id) => {
        try {
            const negocio = await obtenerNegocioPorId(id);
            setNegocioSeleccionado(negocio);
            setMostrarModal(true);
        } catch (error) {
            console.error(error);
            alert("No fue posible obtener el negocio.");
        }
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setNegocioSeleccionado(null);
    };

    return (
        <div className="negocios-admin-container">
            <h1 className="view-title">Lista de Negocios</h1>

            {/* RESUMEN */}
            <div className="negocios-summary">
                <div className="summary-card">
                    <FaStore />
                    <span>
                        Total Negocios <strong>{totalNegocios}</strong>
                    </span>
                </div>
                <div className="summary-card">
                    <FaTags style={{ color: "#2196F3" }} />
                    <span>
                        Categorías <strong>{totalCategorias}</strong>
                    </span>
                </div>
                <div className="summary-card">
                    <FaBoxOpen style={{ color: "#4CAF50" }} />
                    <span>
                        Productos <strong>{totalProductos}</strong>
                    </span>
                </div>
            </div>

            {/* BARRA DE ACCIÓN / FILTROS Y BÚSQUEDA */}
            <div className="action-bar">
                <button
                    className="btn-orange"
                    onClick={() => setMostrarModalCategorias(true)}
                >
                    <FaPlusCircle /> Agregar Categorías
                </button>

                {/* BARRA DE BÚSQUEDA */}
                <div className="search-group">
                    <FaSearch />
                    <input
                        type="text"
                        className="usuarios-input"
                        placeholder="Buscar por negocio, correo o propietario..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label>Categoría</label>
                    <select
                        className="usuarios-select"
                        value={categoriaFiltro}
                        onChange={(e) => setCategoriaFiltro(e.target.value)}
                    >
                        <option value="todos">Todas</option>
                        {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                    <button className="btn-orange" onClick={limpiarFiltros}>
                        <FaUndo /> Limpiar
                    </button>
                </div>
            </div>

            {/* TABLA */}
            <div className="table-container">
                <table className="negocios-table">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Negocio</th>
                            <th>Propietario</th>
                            <th>Información</th>
                            <th>Productos</th>
                            <th>Estado</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "40px" }}>
                                    Cargando negocios...
                                </td>
                            </tr>
                        ) : negociosPaginados.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="sin-datos">
                                    No existen negocios con los filtros seleccionados.
                                </td>
                            </tr>
                        ) : (
                            negociosPaginados.map((negocio) => (
                                <tr key={negocio.id_negocio}>
                                    <td>
                                        {negocio.logo ? (
                                            <img
                                                src={negocio.logo}
                                                alt={negocio.nombre_negocio}
                                                className="logo-business"
                                            />
                                        ) : (
                                            <div className="logo-business logo-placeholder">
                                                <FaStore />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <strong>{negocio.nombre_negocio}</strong>
                                        <br />
                                        <small>{negocio.categoria?.nombre_categoria}</small>
                                    </td>
                                    <td>
                                        <strong>{nombrePropietario(negocio.perfil)}</strong>
                                        <br />
                                        <small>{negocio.perfil?.correo}</small>
                                    </td>
                                    <td>
                                        <strong>Descripción</strong>
                                        <br />
                                        <small>
                                            {negocio.descripcion_negocio || "Sin descripción"}
                                        </small>
                                    </td>
                                    <td>
                                        <span className="product-badge">
                                            <FaBoxOpen /> {negocio.productos?.length || 0} Productos
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`status-badge ${
                                                negocio.estado_negocio === "APROBADO"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }`}
                                        >
                                            {negocio.estado_negocio}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon view"
                                                title="Ver detalles"
                                                onClick={() => verNegocio(negocio.id_negocio)}
                                            >
                                                <FaEye />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINACIÓN */}
            {!loading && negociosFiltrados.length > 0 && (
                <div className="pagination-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "15px" }}>
                    <button
                        className="btn-orange"
                        disabled={paginaActual === 1}
                        onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                    >
                        Anterior
                    </button>
                    <span>
                        Página {paginaActual} de {totalPaginas}
                    </span>
                    <button
                        className="btn-orange"
                        disabled={paginaActual === totalPaginas}
                        onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                    >
                        Siguiente
                    </button>
                </div>
            )}

            {/* MODAL */}
            {mostrarModal && negocioSeleccionado && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Detalles del Negocio</h2>
                            <button className="modal-close" onClick={cerrarModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detalle-item">
                                <span className="detalle-label">Nombre</span>
                                <span className="detalle-valor">{negocioSeleccionado.nombre_negocio}</span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Propietario</span>
                                <span className="detalle-valor">
                                    <strong>{nombrePropietario(negocioSeleccionado.perfil)}</strong>
                                    <br />
                                    <small>{negocioSeleccionado.perfil?.correo}</small>
                                </span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Descripción</span>
                                <span className="detalle-valor">
                                    {negocioSeleccionado.descripcion_negocio || "Sin descripción"}
                                </span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Teléfono</span>
                                <span className="detalle-valor">
                                    {negocioSeleccionado.telefono_negocio || "No registrado"}
                                </span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Estado</span>
                                <span
                                    className={`status-badge ${
                                        negocioSeleccionado.estado_negocio === "APROBADO"
                                            ? "status-active"
                                            : "status-inactive"
                                    }`}
                                >
                                    {negocioSeleccionado.estado_negocio}
                                </span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Puesto</span>
                                <span className="detalle-valor">
                                    {negocioSeleccionado.puesto?.[0]?.numero_puesto || "Sin asignar"}
                                </span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Productos registrados</span>
                                <span className="detalle-valor">
                                    {negocioSeleccionado.productos?.length || 0}
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-orange" onClick={cerrarModal}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            <ModalCategorias
                abierto={mostrarModalCategorias}
                onClose={() => setMostrarModalCategorias(false)}
            />
        </div>
    );
}

export default ListaNegociosAdmin;