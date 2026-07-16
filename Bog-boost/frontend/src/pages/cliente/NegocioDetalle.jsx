import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerNegocioPorId } from "../../api/negocioApi";
import toast from "react-hot-toast";
import "../../styles/Negocios.css";

function NegocioDetalle() {
    const { id } = useParams();

    const [negocio, setNegocio] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarNegocio();
        cargarProductos();
    }, [id]);

    const cargarNegocio = async () => {
        try {
            const data = await obtenerNegocioPorId(id);
            setNegocio(data);
        } catch (error) {
            toast.error("Error al cargar negocio");
        }
    };

    const cargarProductos = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/productos/negocio/${id}`
            );
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            toast.error("Error al cargar productos");
        }
    };

    if (!negocio) return <p>Cargando...</p>;

    return (
        <div className="negocio-detalle">
            <h2>{negocio.nombre_negocio}</h2>
            <p>{negocio.descripcion}</p>

            <h3>Productos</h3>

            <div className="productos-grid">
                {productos.map((p) => (
                    <div key={p.id_producto} className="producto-card">
                        <h4>{p.nombre_producto}</h4>
                        <p>
                            {Number(p.precio).toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NegocioDetalle;