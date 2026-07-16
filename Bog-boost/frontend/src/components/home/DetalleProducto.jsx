import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import { obtenerProducto } from "../../api/productoApi";

import "../../styles/DetalleProducto.css";

function DetalleProducto() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);

    const [cantidad, setCantidad] = useState(1);

    const { isAuthenticated } = useAuth();

    const { agregarProducto } = useCarrito();

    useEffect(() => {

        cargarProducto();
        setCantidad(1);

    }, [id]);

    const cargarProducto = async () => {

        try {

            const data = await obtenerProducto(id);

            setProducto(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!producto) {

        return <h2>Cargando producto...</h2>;

    }

    console.log(producto);

    const agregarAlCarrito = () => {

        // 🔴 no logueado → login
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        // 🟢 agregar al carrito global
        agregarProducto({
            id_producto: producto.id_producto,
            id_negocio: producto.id_negocio,
            nombre_producto: producto.nombre_producto,
            precio: producto.precio,
            imagen: producto.imagen,
            nombre_negocio: producto.negocio?.nombre_negocio,
            cantidad
        });


        toast.success("Producto agregado al carrito");
        console.log("Agregado al carrito:", {
            producto,
            cantidad
        });
    };

    const aumentarCantidad = () => {

        if (cantidad < producto.stock) {

            setCantidad(cantidad + 1);

        }

    };

    const disminuirCantidad = () => {

        if (cantidad > 1) {

            setCantidad(cantidad - 1);

        }

    };

    return (

        <div className="detalle-producto">

            <button
                className="btn-volver"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft />
                Volver
            </button>

            <div className="detalle-card">

                <div className="detalle-imagen">

                    {

                        producto.imagen ?

                            <img
                                src={producto.imagen}
                                alt={producto.nombre_producto}
                            />

                            :

                            <div className="sin-imagen">

                                Sin imagen

                            </div>

                    }

                </div>

                <div className="detalle-info">

                    <h1>

                        {producto.nombre_producto}

                    </h1>

                    <p className="categoria">

                        {producto.categoria?.nombre_categoria}

                    </p>

                    <div className="precio">

                        {

                            Number(producto.precio).toLocaleString(

                                "es-CO",

                                {

                                    style: "currency",

                                    currency: "COP"

                                }

                            )

                        }

                    </div>

                    <div className="estado-producto">

                        Estado:

                        <span

                            className={

                                producto.estado_producto === "DISPONIBLE"

                                    ?

                                    "estado-disponible"

                                    :

                                    "estado-agotado"

                            }

                        >

                            {producto.estado_producto}

                        </span>

                    </div>

                    <p className="stock">

                        <strong>Disponibles:</strong>

                        {producto.stock}

                    </p>

                    <div className="selector-cantidad">

                        <button
                            onClick={disminuirCantidad}
                        >
                            -
                        </button>

                        <span>

                            {cantidad}

                        </span>

                        <button
                            onClick={aumentarCantidad}
                        >
                            +

                        </button>

                    </div>


                    <button
                        className="btn-comprar"
                        onClick={agregarAlCarrito}
                    >

                        <FaShoppingCart />

                        Agregar al carrito

                    </button>

                    <div className="info-negocio">

                        {

                            producto.negocio?.logo &&

                            <img

                                src={producto.negocio.logo}

                                className="logo-negocio"

                                alt={producto.negocio.nombre_negocio}

                            />

                        }

                        <div>

                            <small>

                                Vendido por

                            </small>

                            <h3>

                                {producto.negocio?.nombre_negocio}

                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            <div className="descripcion-card">

                <h2>

                    Descripción

                </h2>

                <p>

                    {producto.descripcion}

                </p>

            </div>

            <div className="caracteristicas-card">

                <h2>

                    Características

                </h2>

                <p>

                    {producto.caracteristicas}

                </p>

            </div>

        </div>

    );
}

export default DetalleProducto;