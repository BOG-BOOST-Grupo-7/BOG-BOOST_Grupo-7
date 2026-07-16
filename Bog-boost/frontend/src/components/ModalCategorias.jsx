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

    const guardar = async () => {

        try {

            if (editando) {

                await actualizarCategoria(

                    editando,
                    formulario

                );

            } else {

                await crearCategoria(formulario);

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

                            onChange={(e) =>

                                setFormulario({

                                    ...formulario,
                                    nombre_categoria: e.target.value

                                })

                            }

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
