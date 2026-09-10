import { useEffect, useState } from "react";
import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../api/categoriaApi";

import "../styles/PerfilNegocio.css";

export default function ModalCategorias({
    abierto,
    onClose
}) {
    const [categorias, setCategorias] = useState([]);
    const [editando, setEditando] = useState(null);
    const [formulario, setFormulario] = useState({
        nombre_categoria: "",
        id_categoria_padre: ""
    });
    const [errorValidacion, setErrorValidacion] = useState("");

    useEffect(() => {
        if (abierto) {
            cargarCategorias();
            limpiarFormulario();
        }
    }, [abierto]);

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
        }
    };

    const validarFormulario = () => {
        const nombreLimpio = formulario.nombre_categoria.trim();

        if (!nombreLimpio) {
            setErrorValidacion("El nombre de la categoría es obligatorio.");
            return false;
        }

        if (nombreLimpio.length < 2) {
            setErrorValidacion("El nombre debe tener al menos 2 caracteres.");
            return false;
        }

        // Validación que permite únicamente letras (con acentos y eñes) y espacios
        const regexValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regexValido.test(nombreLimpio)) {
            setErrorValidacion("El nombre de la categoría solo debe contener letras.");
            return false;
        }

        // Evitar que una categoría sea padre de sí misma
        if (editando && String(formulario.id_categoria_padre) === String(editando)) {
            setErrorValidacion("Una categoría no puede ser padre de sí misma.");
            return false;
        }

        setErrorValidacion("");
        return true;
    };

    const guardar = async () => {
        if (!validarFormulario()) return;

        try {
            const datosAEnviar = {
                ...formulario,
                nombre_categoria: formulario.nombre_categoria.trim()
            };

            if (editando) {
                await actualizarCategoria(editando, datosAEnviar);
            } else {
                await crearCategoria(datosAEnviar);
            }

            limpiarFormulario();
            cargarCategorias();
        } catch (error) {
            console.error(error);
        }
    };

    const editar = (categoria) => {
        setEditando(categoria.id_categoria);
        setFormulario({
            nombre_categoria: categoria.nombre_categoria,
            id_categoria_padre: categoria.id_categoria_padre || ""
        });
        setErrorValidacion("");
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar esta categoría?")) {
            return;
        }

        try {
            await eliminarCategoria(id);
            cargarCategorias();
        } catch (error) {
            console.error(error);
        }
    };

    const limpiarFormulario = () => {
        setFormulario({
            nombre_categoria: "",
            id_categoria_padre: ""
        });
        setEditando(null);
        setErrorValidacion("");
    };

    if (!abierto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>
                        {
                            editando
                                ? "Editar categoría"
                                : "Administrar categorías"
                        }
                    </h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>
                            Nombre
                        </label>
                        <input
                            value={formulario.nombre_categoria}
                            onChange={(e) => {
                                // Reemplaza cualquier número por una cadena vacía en tiempo real
                                const valorSinNumeros = e.target.value.replace(/[0-9]/g, "");
                                setFormulario({
                                    ...formulario,
                                    nombre_categoria: valorSinNumeros
                                });
                                if (errorValidacion) setErrorValidacion("");
                            }}
                            placeholder="Ej. Entradas, Bebidas..."
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Categoría padre
                        </label>
                        <select
                            value={formulario.id_categoria_padre}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    id_categoria_padre: e.target.value
                                })
                            }
                        >
                            <option value="">
                                Ninguna
                            </option>
                            {
                                categorias
                                    .filter(
                                        c => c.id_categoria !== editando
                                    )
                                    .map(categoria => (
                                        <option
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}
                                        >
                                            {categoria.nombre_categoria}
                                        </option>
                                    ))
                            }
                        </select>
                    </div>

                    {errorValidacion && (
                        <p className="error-mensaje" style={{ color: "red", fontSize: "13px", marginTop: "-5px", marginBottom: "10px" }}>
                            {errorValidacion}
                        </p>
                    )}

                    <div className="acciones-formulario">
                        <button
                            className="btn-green"
                            onClick={guardar}
                        >
                            {editando ? (
                                <>
                                    <FaEdit />
                                    Actualizar
                                </>
                            ) : (
                                <>
                                    <FaPlus />
                                    Guardar
                                </>
                            )}
                        </button>

                        {editando && (
                            <button
                                className="btn-orange"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>

                    <div className="lista-categorias">
                        {
                            categorias.length === 0 ? (
                                <p className="sin-categorias">
                                    No existen categorías.
                                </p>
                            ) : (
                                categorias.map(categoria => (
                                    <div
                                        className="categoria-card"
                                        key={categoria.id_categoria}
                                    >
                                        <h4>
                                            {categoria.nombre_categoria}
                                        </h4>
                                        <p>
                                            <strong>
                                                Categoría padre:
                                            </strong>{" "}
                                            {
                                                categoria.id_categoria_padre
                                                    ? categorias.find(
                                                        c =>
                                                            c.id_categoria ===
                                                            categoria.id_categoria_padre
                                                    )?.nombre_categoria ||
                                                    "No encontrada"
                                                    : "Ninguna"
                                            }
                                        </p>
                                        <div className="acciones-categoria">
                                            <button
                                                className="btn-orange"
                                                onClick={() =>
                                                    editar(categoria)
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    eliminar(
                                                        categoria.id_categoria
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="btn-orange"
                        onClick={() => {
                            limpiarFormulario();
                            onClose();
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}