import { useEffect, useState } from "react";

import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {

    obtenerMisProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto

} from "../api/productoApi";

import {
    obtenerCategorias
} from "../api/categoriaApi";

import {

    subirImagenProducto

} from "../api/uploadApi";

import "../styles/PerfilNegocio.css";

export default function ModalProductos({

    abierto,
    onClose,
    idNegocio

}) {

    const [productos, setProductos] = useState([]);

    const [categorias, setCategorias] = useState([]);

    const [editando, setEditando] = useState(null);

    const [previewImagen, setPreviewImagen] = useState("");

    const [subiendoImagen, setSubiendoImagen] = useState(false);

    const [formulario, setFormulario] = useState({

        id_categoria: "",

        nombre_producto: "",

        descripcion: "",

        caracteristicas: "",

        stock: "",

        precio: "",

        imagen: ""

    });

    useEffect(() => {

        if (abierto) {

            cargarProductos();

            cargarCategorias();

            limpiarFormulario();

        }

    }, [abierto]);

    const cargarProductos = async () => {

        try {

            const data =
                await obtenerMisProductos();

            setProductos(data);

        } catch (error) {

            console.error(error);

        }

    };

    const subirImagen = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Solo se permiten imágenes");

            return;

        }

        if (file.size > 5 * 1024 * 1024) {

            alert("Máximo 5MB");

            return;

        }

        const imagen = new Image();

        imagen.src = URL.createObjectURL(file);

        try {

            await new Promise((resolve, reject) => {

                imagen.onload = () => {

                    if (

                        imagen.width > 2500 ||

                        imagen.height > 2500

                    ) {

                        reject(

                            new Error(

                                "La imagen es demasiado grande."

                            )

                        );

                    } else {

                        resolve();

                    }

                };

            });

            setPreviewImagen(

                URL.createObjectURL(file)

            );

            setSubiendoImagen(true);

            const respuesta =

                await subirImagenProducto(file);

            setFormulario((prev) => ({

                ...prev,

                imagen: respuesta.url

            }));

        } catch (error) {

            alert(

                error.response?.data?.mensaje ||

                error.message ||

                "Error al subir la imagen"

            );

        } finally {

            setSubiendoImagen(false);

        }

    };

    const cargarCategorias = async () => {

        try {

            const data =
                await obtenerCategorias();

            setCategorias(data);

        } catch (error) {

            console.error(error);

        }

    };

    const guardar = async () => {

        try {

            if (editando) {

                await actualizarProducto(

                    editando,

                    formulario

                );

            } else {

                await crearProducto({

                    ...formulario,

                    id_negocio: idNegocio

                });

            }

            limpiarFormulario();

            cargarProductos();

        } catch (error) {

            console.error(error);

        }

    };

    const editar = (producto) => {

        setEditando(

            producto.id_producto

        );

        setFormulario({

            id_categoria:
                producto.id_categoria,

            nombre_producto:
                producto.nombre_producto,

            descripcion:
                producto.descripcion,

            caracteristicas:
                producto.caracteristicas,

            stock:
                producto.stock,

            precio:
                producto.precio,

            imagen:
                producto.imagen

        });

        setPreviewImagen(producto.imagen || "");

    };

    const eliminar = async (id) => {

        if (

            !window.confirm(

                "¿Eliminar este producto?"

            )

        ) {

            return;

        }

        try {

            await eliminarProducto(id);

            cargarProductos();

        } catch (error) {

            console.error(error);

        }

    };

    const limpiarFormulario = () => {

        setFormulario({

            id_categoria: "",

            nombre_producto: "",

            descripcion: "",

            caracteristicas: "",

            stock: "",

            precio: "",

            imagen: ""

        });

        setPreviewImagen("");
        setEditando(null);

    };

    if (!abierto) return null;

    console.log("Estado actual de productos:", productos);

    return (

        <div className="modal-overlay">

            <div className="modal-content">

                <div className="modal-header">

                    <h2>

                        {

                            editando
                                ? "Editar producto"
                                : "Administrar productos"

                        }

                    </h2>

                </div>

                <div className="modal-body">

                    <div className="form-group">

                        <label>

                            Imagen del producto

                        </label>

                        <label className="logo-upload">

                            {previewImagen ? (

                                <img

                                    src={previewImagen}

                                    alt="Producto"

                                    className="preview-logo"

                                />

                            ) : (

                                <>

                                    <div className="logo-icon">

                                        📦

                                    </div>

                                    <p>

                                        Haz clic para seleccionar la imagen

                                    </p>

                                    <small>

                                        PNG, JPG o WEBP (máx. 5MB)

                                    </small>

                                </>

                            )}

                            <input

                                type="file"

                                hidden

                                accept="image/png,image/jpeg,image/webp"

                                onChange={subirImagen}

                            />

                        </label>

                    </div>

                    {subiendoImagen && (

                        <div className="uploading">

                            ⏳ Subiendo imagen...

                        </div>

                    )}

                    {previewImagen && !subiendoImagen && (

                        <button

                            type="button"

                            className="btn-eliminar-logo"

                            onClick={() => {

                                setPreviewImagen("");

                                setFormulario({

                                    ...formulario,

                                    imagen: ""

                                });

                            }}

                        >

                            🗑 Cambiar imagen

                        </button>

                    )}

                    <div className="form-group">

                        <label>

                            Categoría

                        </label>

                        <select

                            value={formulario.id_categoria}

                            onChange={(e) =>
                                setFormulario({

                                    ...formulario,

                                    id_categoria: e.target.value

                                })
                            }

                        >

                            <option value="">

                                Seleccione una categoría

                            </option>

                            {

                                categorias.map((categoria) => (

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

                    <div className="form-group">

                        <label>

                            Nombre

                        </label>

                        <input

                            placeholder="Nombre del producto"

                            value={formulario.nombre_producto}

                            onChange={(e) =>
                                setFormulario({

                                    ...formulario,

                                    nombre_producto: e.target.value

                                })
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Descripción

                        </label>

                        <textarea

                            rows="3"

                            value={formulario.descripcion}

                            onChange={(e) =>
                                setFormulario({

                                    ...formulario,

                                    descripcion: e.target.value

                                })
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Características

                        </label>

                        <textarea

                            rows="3"

                            value={formulario.caracteristicas}

                            onChange={(e) =>
                                setFormulario({

                                    ...formulario,

                                    caracteristicas: e.target.value

                                })
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Stock

                        </label>

                        <input

                            type="number"

                            min="0"

                            value={formulario.stock}

                            onChange={(e) =>
                                setFormulario({

                                    ...formulario,

                                    stock:
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)

                                })
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Precio

                        </label>

                        <input

                            type="number"

                            min="0"

                            step="0.01"

                            value={formulario.precio}

                            onChange={(e) =>
                                setFormulario({

                                    ...formulario,

                                    precio:
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)

                                })
                            }

                        />

                    </div>

                    {

                        formulario.imagen && (

                            <div className="preview-imagen">

                                <img

                                    src={formulario.imagen}

                                    alt="Vista previa"

                                />

                            </div>

                        )

                    }

                    <div className="acciones-formulario">

                        <button
                            className="btn-green"
                            disabled={subiendoImagen}
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
                                type="button"
                                className="btn-orange"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}

                    </div>

                    <div className="lista-medios">

                        {

                            productos.length === 0 ? (

                                <p className="sin-medios">

                                    No has registrado productos.

                                </p>

                            ) : (

                                productos.map((producto) => (

                                    <div

                                        className="card-medio"

                                        key={producto.id_producto}

                                    >

                                        {

                                            producto.imagen && (

                                                <img

                                                    className="mini-producto"

                                                    src={producto.imagen}

                                                    alt={producto.nombre_producto}

                                                />

                                            )

                                        }

                                        <h4>

                                            {producto.nombre_producto}

                                        </h4>

                                        <p>

                                            <strong>

                                                Categoría:

                                            </strong>{" "}

                                            {

                                                producto.categoria?.nombre_categoria

                                            }

                                        </p>

                                        <p>

                                            <strong>

                                                Precio:

                                            </strong>{" "}

                                            {

                                                Number(producto.precio)

                                                    .toLocaleString(

                                                        "es-CO",

                                                        {

                                                            style: "currency",

                                                            currency: "COP"

                                                        }

                                                    )

                                            }

                                        </p>

                                        <p>

                                            <strong>

                                                Stock:

                                            </strong>{" "}

                                            {producto.stock}

                                        </p>

                                        <p>

                                            <strong>

                                                Estado:

                                            </strong>{" "}

                                            {producto.estado_producto}

                                        </p>

                                        <div className="acciones-medio">

                                            <button

                                                className="btn-orange"

                                                onClick={() =>
                                                    editar(producto)
                                                }

                                            >

                                                <span>Editar</span>

                                            </button>

                                            <button

                                                className="btn-delete"

                                                onClick={() =>
                                                    eliminar(

                                                        producto.id_producto

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
