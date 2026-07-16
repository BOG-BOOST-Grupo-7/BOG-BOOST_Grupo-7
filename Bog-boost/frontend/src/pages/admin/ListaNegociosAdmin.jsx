import { useEffect, useMemo, useState } from "react";

import {
    FaStore,
    FaTags,
    FaPlusCircle,
    FaUndo,
    FaEye,
    FaEdit,
    FaTrash,
    FaBoxOpen,
} from "react-icons/fa";

import ModalCategorias from "../../components/ModalCategorias";
import "../../styles/ListaNegociosAdmin.css";

import {
    obtenerNegocios,
    obtenerNegocioPorId,
    eliminarNegocio
} from "../../api/negocioApi";

function ListaNegociosAdmin() {

    const [negocios, setNegocios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [categoriaFiltro, setCategoriaFiltro] =
        useState("todos");

    const [negocioSeleccionado, setNegocioSeleccionado] =
        useState(null);

    const [mostrarModal, setMostrarModal] =
        useState(false);

    const [mostrarModalCategorias,
        setMostrarModalCategorias] =
        useState(false);

    useEffect(() => {

        cargarNegocios();

    }, []);

    // ============================
    // Cargar negocios
    // ============================

    const cargarNegocios = async () => {

        try {

            setLoading(true);

            const respuesta =
                await obtenerNegocios();

            const negociosAprobados =
                respuesta.filter(
                    (negocio) =>
                        negocio.estado_negocio ===
                        "APROBADO"
                );

            setNegocios(
                negociosAprobados
            );

        } catch (error) {

            console.error(error);

            alert(
                "No fue posible cargar los negocios."
            );

        } finally {

            setLoading(false);

        }

    };

    // ============================
    // Categorías
    // ============================

    const categorias = useMemo(() => {

        const lista = new Set();

        negocios.forEach((negocio) => {

            if (
                negocio.categoria?.nombre_categoria
            ) {

                lista.add(
                    negocio.categoria.nombre_categoria
                );

            }

        });

        return [...lista];

    }, [negocios]);

    // ============================
    // Filtro
    // ============================

    const negociosFiltrados =
        useMemo(() => {

            if (
                categoriaFiltro ===
                "todos"
            ) {

                return negocios;

            }

            return negocios.filter(
                (negocio) =>
                    negocio.categoria
                        ?.nombre_categoria ===
                    categoriaFiltro
            );

        }, [
            negocios,
            categoriaFiltro
        ]);

    // ============================
    // Resumen
    // ============================

    const totalNegocios =
        negociosFiltrados.length;

    const totalCategorias =
        useMemo(() => {

            const lista =
                new Set();

            negocios.forEach(
                (negocio) => {

                    if (
                        negocio.categoria
                            ?.nombre_categoria
                    ) {

                        lista.add(
                            negocio
                                .categoria
                                .nombre_categoria
                        );

                    }

                }
            );

            return lista.size;

        }, [negocios]);

    const totalProductos =
        negociosFiltrados.reduce(
            (total, negocio) =>
                total +
                (
                    negocio
                        .productos
                        ?.length || 0
                ),
            0
        );

    // ============================
    // Limpiar filtros
    // ============================

    const limpiarFiltros = () => {

        setCategoriaFiltro(
            "todos"
        );

    };

    // ============================
    // Ver detalles
    // ============================

    const verNegocio = async (id) => {

        try {

            const negocio =
                await obtenerNegocioPorId(
                    id
                );

            setNegocioSeleccionado(
                negocio
            );

            setMostrarModal(true);

        } catch (error) {

            console.error(error);

            alert(
                "No fue posible obtener el negocio."
            );

        }

    };

    // ============================
    // Editar
    // ============================

    const editarNegocio = (
        negocio
    ) => {

        console.log(
            "Editar:",
            negocio
        );

    };

    // ============================
    // Eliminar
    // ============================

    const eliminar = async (id) => {

        const confirmar =
            window.confirm(
                "¿Deseas eliminar este negocio?"
            );

        if (!confirmar) return;

        try {

            await eliminarNegocio(id);

            alert(
                "Negocio eliminado correctamente."
            );

            cargarNegocios();

        } catch (error) {

            console.error(error);

            alert(
                "No fue posible eliminar el negocio."
            );

        }

    };

    // ============================
    // Cerrar modal
    // ============================

    const cerrarModal = () => {

        setMostrarModal(false);

        setNegocioSeleccionado(
            null
        );

    };

    // ============================
    // Nombre propietario
    // ============================

    const nombrePropietario =
        (perfil) => {

            if (!perfil)
                return
            "No disponible";

            return [

                perfil.primer_nombre,

                perfil.segundo_nombre,

                perfil.primer_apellido,

                perfil.segundo_apellido,

            ]
                .filter(Boolean)
                .join(" ");

        };
    return (

        <div className="negocios-admin-container">

            <h1 className="view-title">
                Lista de Negocios
            </h1>

            {/* ================= RESUMEN ================= */}

            <div className="negocios-summary">

                <div className="summary-card">

                    <FaStore />

                    <span>

                        Total Negocios

                        <strong>
                            {totalNegocios}
                        </strong>

                    </span>

                </div>

                <div className="summary-card">

                    <FaTags
                        style={{
                            color: "#2196F3"
                        }}
                    />

                    <span>

                        Categorías

                        <strong>
                            {totalCategorias}
                        </strong>

                    </span>

                </div>

                <div className="summary-card">

                    <FaBoxOpen
                        style={{
                            color: "#4CAF50"
                        }}
                    />

                    <span>

                        Productos

                        <strong>
                            {totalProductos}
                        </strong>

                    </span>

                </div>

            </div>

            {/* ================= BARRA ================= */}

            <div className="action-bar">

                <button

                    className="btn-orange"

                    onClick={() =>

                        setMostrarModalCategorias(true)

                    }

                >

                    <FaPlusCircle />

                    Agregar Categorías

                </button>

                <div className="filter-group">

                    <label>

                        Categoría

                    </label>

                    <select

                        value={categoriaFiltro}

                        onChange={(e) =>
                            setCategoriaFiltro(
                                e.target.value
                            )
                        }

                    >

                        <option value="todos">

                            Todas

                        </option>

                        {categorias.map(
                            (categoria) => (

                                <option
                                    key={categoria}
                                    value={categoria}
                                >

                                    {categoria}

                                </option>

                            )
                        )}

                    </select>

                    <button

                        className="btn-orange"

                        onClick={limpiarFiltros}

                    >

                        <FaUndo />

                        Limpiar

                    </button>

                </div>

            </div>

            {/* ================= TABLA ================= */}

            <div className="table-container">

                <table className="negocios-table">

                    <thead>

                        <tr>

                            <th>

                                Logo

                            </th>

                            <th>

                                Negocio

                            </th>

                            <th>

                                Propietario

                            </th>

                            <th>

                                Información

                            </th>

                            <th>

                                Productos

                            </th>

                            <th>

                                Estado

                            </th>

                            <th>

                                Acciones

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px"
                                    }}
                                >

                                    Cargando negocios...

                                </td>

                            </tr>

                        ) : negociosFiltrados.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="sin-datos"
                                >

                                    No existen negocios.

                                </td>

                            </tr>

                        ) : (

                            negociosFiltrados.map(
                                (negocio) => (

                                    <tr
                                        key={
                                            negocio.id_negocio
                                        }
                                    >

                                        <td>

                                            {negocio.logo ? (

                                                <img

                                                    src={negocio.logo}

                                                    alt={
                                                        negocio.nombre_negocio
                                                    }

                                                    className="logo-business"

                                                />

                                            ) : (

                                                <div className="logo-business logo-placeholder">

                                                    <FaStore />

                                                </div>

                                            )}

                                        </td>

                                        <td>

                                            <strong>

                                                {
                                                    negocio.nombre_negocio
                                                }

                                            </strong>

                                            <br />

                                            <small>

                                                {
                                                    negocio.categoria
                                                        ?.nombre_categoria
                                                }

                                            </small>

                                        </td>

                                        <td>

                                            <strong>

                                                {nombrePropietario(
                                                    negocio.perfil
                                                )}

                                            </strong>

                                            <br />

                                            <small>

                                                {
                                                    negocio.perfil
                                                        ?.correo
                                                }

                                            </small>

                                        </td>

                                        <td>

                                            <strong>

                                                Descripción

                                            </strong>

                                            <br />

                                            <small>

                                                {negocio.descripcion_negocio ||
                                                    "Sin descripción"}

                                            </small>

                                        </td>

                                        <td>

                                            <span className="product-badge">

                                                <FaBoxOpen />

                                                {
                                                    negocio.productos
                                                        ?.length || 0
                                                }

                                                {" "}Productos

                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={`status-badge ${negocio.estado_negocio ===
                                                    "APROBADO"
                                                    ? "status-active"
                                                    : "status-inactive"
                                                    }`}
                                            >

                                                {
                                                    negocio.estado_negocio
                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button

                                                    className="btn-icon view"

                                                    title="Ver detalles"

                                                    onClick={() =>
                                                        verNegocio(
                                                            negocio.id_negocio
                                                        )
                                                    }

                                                >

                                                    <FaEye />

                                                </button>

                                                <button

                                                    className="btn-icon edit"

                                                    title="Editar"

                                                    onClick={() =>
                                                        editarNegocio(
                                                            negocio
                                                        )
                                                    }

                                                >

                                                    <FaEdit />

                                                </button>

                                                <button

                                                    className="btn-icon delete"

                                                    title="Eliminar"

                                                    onClick={() =>
                                                        eliminar(
                                                            negocio.id_negocio
                                                        )
                                                    }

                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

            {/* ================= MODAL ================= */}

            {mostrarModal && negocioSeleccionado && (

                <div
                    className="modal-overlay"
                    onClick={cerrarModal}
                >

                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="modal-header">

                            <h2>
                                Detalles del Negocio
                            </h2>

                            <button
                                className="modal-close"
                                onClick={cerrarModal}
                            >
                                ×
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Nombre
                                </span>

                                <span className="detalle-valor">
                                    {negocioSeleccionado.nombre_negocio}
                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Propietario
                                </span>

                                <span className="detalle-valor">

                                    {nombrePropietario(
                                        negocioSeleccionado.perfil
                                    )}

                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Categoría
                                </span>

                                <span className="detalle-valor">

                                    {
                                        negocioSeleccionado.categoria
                                            ?.nombre_categoria
                                    }

                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Descripción
                                </span>

                                <span className="detalle-valor">

                                    {
                                        negocioSeleccionado.descripcion_negocio ||
                                        "Sin descripción"
                                    }

                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Teléfono
                                </span>

                                <span className="detalle-valor">

                                    {
                                        negocioSeleccionado.telefono_negocio ||
                                        "No registrado"
                                    }

                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Estado
                                </span>

                                <span
                                    className={`status-badge ${negocioSeleccionado.estado_negocio ===
                                        "APROBADO"
                                        ? "status-active"
                                        : "status-inactive"
                                        }`}
                                >

                                    {
                                        negocioSeleccionado.estado_negocio
                                    }

                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Puesto
                                </span>

                                <span className="detalle-valor">

                                    {
                                        negocioSeleccionado.puesto?.[0]
                                            ?.numero_puesto ||
                                        "Sin asignar"
                                    }

                                </span>

                            </div>

                            <div className="detalle-item">

                                <span className="detalle-label">
                                    Productos registrados
                                </span>

                                <span className="detalle-valor">

                                    {
                                        negocioSeleccionado.productos
                                            ?.length || 0
                                    }

                                </span>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn-orange"
                                onClick={cerrarModal}
                            >

                                Cerrar

                            </button>

                        </div>

                    </div>

                </div>

            )}

            <ModalCategorias
                abierto={mostrarModalCategorias}
                onClose={() =>
                    setMostrarModalCategorias(false)
                }
            />

        </div>

    );

}

export default ListaNegociosAdmin;