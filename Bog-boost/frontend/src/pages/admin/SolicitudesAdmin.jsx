import "../../styles/SolicitudesAdmin.css";
import { useEffect, useMemo, useState } from "react";

import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaCheck,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import {
    obtenerSolicitudes,
    aprobarSolicitud,
    rechazarSolicitud,
} from "../../api/negocioApi";

function SolicitudesAdmin() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [estadoFiltro, setEstadoFiltro] = useState("PENDIENTE");

    // ================= ESTADOS DE PAGINACIÓN =================
    const [paginaActual, setPaginaActual] = useState(1);
    const filasPorPagina = 8;

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = async () => {
        try {
            setLoading(true);
            const data = await obtenerSolicitudes();
            setSolicitudes(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar las solicitudes.");
        } finally {
            setLoading(false);
        }
    };

    const aprobar = async (id) => {
        if (!window.confirm("¿Deseas aprobar esta solicitud?")) return;

        try {
            await aprobarSolicitud(id);
            alert("Negocio aprobado correctamente.");
            cerrarModal();
            cargarSolicitudes();
        } catch (error) {
            console.error(error);
            alert("No fue posible aprobar la solicitud.");
        }
    };

    const rechazar = async (id) => {
        const observacion = window.prompt("Escribe el motivo del rechazo:");

        if (!observacion || !observacion.trim()) {
            alert("Debes escribir un motivo del rechazo.");
            return;
        }

        try {
            await rechazarSolicitud(id, observacion.trim());
            alert("Negocio rechazado correctamente.");
            cerrarModal();
            cargarSolicitudes();
        } catch (error) {
            console.error(error);
            alert("No fue posible rechazar.");
        }
    };

    const verDetalles = (solicitud) => {
        setSolicitudSeleccionada(solicitud);
    };

    const cerrarModal = () => {
        setSolicitudSeleccionada(null);
    };

    const solicitudesFiltradas = useMemo(() => {
        if (estadoFiltro === "TODOS") return solicitudes;

        return solicitudes.filter(
            (s) => s.estado_negocio === estadoFiltro
        );
    }, [solicitudes, estadoFiltro]);

    // Cada vez que cambie el filtro, regresamos a la página 1
    useEffect(() => {
        setPaginaActual(1);
    }, [estadoFiltro]);

    // =====================================
    // Lógica de Paginación
    // =====================================
    const totalPaginas = Math.ceil(solicitudesFiltradas.length / filasPorPagina) || 1;

    const solicitudesPaginadas = useMemo(() => {
        const inicio = (paginaActual - 1) * filasPorPagina;
        return solicitudesFiltradas.slice(inicio, inicio + filasPorPagina);
    }, [solicitudesFiltradas, paginaActual, filasPorPagina]);

    const total = solicitudes.length;
    const pendientes = solicitudes.filter((s) => s.estado_negocio === "PENDIENTE").length;
    const aprobadas = solicitudes.filter((s) => s.estado_negocio === "APROBADO").length;
    const rechazadas = solicitudes.filter((s) => s.estado_negocio === "RECHAZADO").length;

    const estadoClass = (estado) => {
        switch (estado) {
            case "PENDIENTE":
                return "status-badge status-pending";
            case "APROBADO":
                return "status-badge status-approved";
            case "RECHAZADO":
                return "status-badge status-rejected";
            default:
                return "status-badge";
        }
    };

    return (
        <main className="solicitudes-admin">
            <h1 className="view-title">Solicitudes de Negocios</h1>

            {/* ============================
            TARJETAS RESUMEN
            ============================ */}
            <section className="solicitudes-summary">
                <div className="summary-card">
                    <FaClipboardList />
                    <span>
                        Total Solicitudes
                        <strong>{total}</strong>
                    </span>
                </div>
                <div className="summary-card">
                    <FaClock />
                    <span>
                        Pendientes
                        <strong>{pendientes}</strong>
                    </span>
                </div>
                <div className="summary-card">
                    <FaCheckCircle />
                    <span>
                        Aprobadas
                        <strong>{aprobadas}</strong>
                    </span>
                </div>
                <div className="summary-card">
                    <FaTimesCircle />
                    <span>
                        Rechazadas
                        <strong>{rechazadas}</strong>
                    </span>
                </div>
            </section>

            {/* ============================
            FILTRO
            ============================ */}
            <section className="action-bar">
                <div></div>
                <div className="filter-group">
                    <label>Estado</label>
                    <select
                        value={estadoFiltro}
                        onChange={(e) => setEstadoFiltro(e.target.value)}
                    >
                        <option value="PENDIENTE">Pendientes</option>
                        <option value="APROBADO">Aprobadas</option>
                        <option value="RECHAZADO">Rechazadas</option>
                        <option value="TODOS">Todos</option>
                    </select>
                </div>
            </section>

            {/* ============================
            TABLA
            ============================ */}
            <div className="table-container">
                <table className="solicitudes-table">
                    <thead>
                        <tr>
                            <th>Negocio</th>
                            <th>Propietario</th>
                            <th>Información</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="sin-datos">
                                    Cargando solicitudes...
                                </td>
                            </tr>
                        ) : solicitudesPaginadas.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="sin-datos">
                                    No existen solicitudes.
                                </td>
                            </tr>
                        ) : (
                            solicitudesPaginadas.map((solicitud) => (
                                <tr key={solicitud.id_negocio}>
                                    <td>
                                        <strong>{solicitud.nombre_negocio}</strong>
                                        <br />
                                        <small>{solicitud.descripcion_negocio}</small>
                                    </td>
                                    <td>
                                        <strong>
                                            {solicitud.perfil?.primer_nombre}{" "}
                                            {solicitud.perfil?.segundo_nombre}{" "}
                                            {solicitud.perfil?.primer_apellido}{" "}
                                            {solicitud.perfil?.segundo_apellido}
                                        </strong>
                                        <br />
                                        <small>{solicitud.perfil?.correo}</small>
                                    </td>
                                    <td>
                                        <strong>Teléfono:</strong>
                                        <br />
                                        {solicitud.telefono_negocio}
                                        <br />
                                        <br />
                                        <strong>Puesto:</strong>
                                        <br />
                                        {solicitud.puesto?.[0]?.numero_puesto}
                                    </td>
                                    <td>
                                        <span className={estadoClass(solicitud.estado_negocio)}>
                                            {solicitud.estado_negocio}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon view"
                                                onClick={() => verDetalles(solicitud)}
                                                title="Ver detalles"
                                            >
                                                <FaEye />
                                            </button>
                                            {solicitud.estado_negocio === "PENDIENTE" && (
                                                <>
                                                    <button
                                                        className="btn-icon approve"
                                                        onClick={() => aprobar(solicitud.id_negocio)}
                                                        title="Aprobar"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        className="btn-icon reject"
                                                        onClick={() => rechazar(solicitud.id_negocio)}
                                                        title="Rechazar"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ============================
            CONTROLES DE PAGINACIÓN
            ============================ */}
            {!loading && solicitudesFiltradas.length > 0 && (
                <div
                    className="pagination-container"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                    }}
                >
                    <span
                        className="pagination-info"
                        style={{ fontSize: "0.9rem", color: "#666" }}
                    >
                        Mostrando del {(paginaActual - 1) * filasPorPagina + 1} al{" "}
                        {Math.min(
                            paginaActual * filasPorPagina,
                            solicitudesFiltradas.length
                        )}{" "}
                        de {solicitudesFiltradas.length} solicitudes
                    </span>
                    <div
                        className="pagination-buttons"
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                        }}
                    >
                        <button
                            className="btn-orange"
                            onClick={() =>
                                setPaginaActual((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={paginaActual === 1}
                            style={{
                                opacity: paginaActual === 1 ? 0.5 : 1,
                                cursor:
                                    paginaActual === 1 ? "not-allowed" : "pointer",
                            }}
                        >
                            <FaChevronLeft /> Anterior
                        </button>
                        <span
                            style={{
                                margin: "0 0.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            Página {paginaActual} de {totalPaginas}
                        </span>
                        <button
                            className="btn-orange"
                            onClick={() =>
                                setPaginaActual((prev) =>
                                    Math.min(prev + 1, totalPaginas)
                                )
                            }
                            disabled={paginaActual === totalPaginas}
                            style={{
                                opacity: paginaActual === totalPaginas ? 0.5 : 1,
                                cursor:
                                    paginaActual === totalPaginas
                                        ? "not-allowed"
                                        : "pointer",
                            }}
                        >
                            Siguiente <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default SolicitudesAdmin;