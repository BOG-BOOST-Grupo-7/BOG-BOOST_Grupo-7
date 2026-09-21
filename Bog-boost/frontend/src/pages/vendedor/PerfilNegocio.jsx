import { useEffect, useState, useRef } from "react"; // <-- Agregamos useRef

import { FaEdit, FaPlus } from "react-icons/fa";

import { obtenerMiNegocio, actualizarNegocio } from "../../api/negocioApi"; // <-- Agregamos actualizarNegocio
import { obtenerMisProductos } from "../../api/productoApi";

import ModalEditarNegocio from "../../components/ModalEditarNegocio";
import ModalMediosPago from "../../components/ModalMediosPago";
import ModalMetodosEnvio from "../../components/ModalMetodosEnvio";
import ModalProductos from "../../components/home/ModalProductos";

import "../../styles/PerfilNegocio.css";

export default function PerfilNegocio() {
    const [negocio, setNegocio] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarMediosPago, setMostrarMediosPago] = useState(false);
    const [mostrarModalEnvio, setMostrarModalEnvio] = useState(false);
    const [mostrarModalProducto, setMostrarModalProducto] = useState(false);

    // ==========================================
    // NUEVO: Lógica para actualizar el Logo
    // ==========================================
    const fileInputRef = useRef(null);
    const [subiendoLogo, setSubiendoLogo] = useState(false);

    const handleClickLogo = () => {
        fileInputRef.current.click(); // Simula el clic en el input oculto
    };

    const handleCambioLogo = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSubiendoLogo(true);
            
            // Usamos FormData porque estamos enviando un archivo
            const formData = new FormData();
            formData.append("logo", file); // "logo" debe coincidir con el campo que espera tu backend

            await actualizarNegocio(negocio.id_negocio, formData);
            await cargarNegocio(); // Recargamos para ver el logo nuevo
            
            alert("Logo actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el logo:", error);
            alert("No se pudo actualizar el logo");
        } finally {
            setSubiendoLogo(false);
        }
    };
    // ==========================================

    useEffect(() => {
        cargarNegocio();
    }, []);

    const cargarNegocio = async () => {
        try {
            setLoading(true);
            const data = await obtenerMiNegocio();
            setNegocio(data);
            const listaProductos = await obtenerMisProductos();
            setProductos(listaProductos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="perfil-negocio"><h2>Cargando negocio...</h2></div>;
    if (!negocio) return <div className="perfil-negocio"><h2>No tienes un negocio registrado.</h2></div>
    
    return (
        <div className="perfil-negocio">
            <h1 className="view-title">
                Perfil del Negocio
            </h1>

            <div className="profile-grid">
                <div className="info-column">
                    <div className="profile-card logo-card">
                        {
                            negocio.logo ?
                                <img
                                    src={negocio.logo}
                                    alt={negocio.nombre_negocio}
                                    className="logo-negocio"
                                />
                                :
                                <div className="logo-placeholder">
                                    Sin logo
                                </div>
                        }

                        {/* Botón para editar el logo */}
                        <button 
                            className="btn-edit" 
                            onClick={handleClickLogo}
                            disabled={subiendoLogo}
                        >
                            <FaEdit />
                            {subiendoLogo ? " Subiendo..." : " Editar"}
                        </button>

                        {/* Input tipo archivo completamente oculto para el logo */}
                        <input 
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleCambioLogo}
                        />
                    </div>

                    <div className="profile-card info-card">
                        <h2>
                            {negocio.nombre_negocio}
                        </h2>
                        <p>
                            <strong>Descripción</strong>
                        </p>
                        <p>
                            {negocio.descripcion_negocio}
                        </p>
                        <p>
                            <strong>Teléfono</strong>
                        </p>
                        <p>
                            {negocio.telefono_negocio}
                        </p>
                        <p>
                            <strong>Estado</strong>
                        </p>
                        <p>
                            {negocio.estado_negocio}
                        </p>
                        <p>
                            <strong>Puesto</strong>
                        </p>
                        <p>
                            {negocio.puesto?.[0]?.numero_puesto}
                        </p>

                        <button
                            className="btn-edit"
                            onClick={() => setMostrarModal(true)}
                        >
                            <FaEdit />
                            Editar información
                        </button>
                    </div>
                </div>

                <div className="map-column">
                    <div className="profile-card map-card">
                        <h3>
                            Mapa del negocio
                        </h3>
                        <div className="map-placeholder">
                            Próximamente
                        </div>
                    </div>
                </div>
            </div>

            <div className="products-section">
                <div className="productos-carrusel">
                    {productos.map(producto => (
                        <div
                            className="producto-carrusel-card"
                            key={producto.id_producto}
                        >
                            <div className="producto-carrusel-imagen">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre_producto}
                                />
                            </div>
                            <div className="producto-carrusel-info">
                                <h4>
                                    {producto.nombre_producto}
                                </h4>
                                <p>
                                    {producto.categoria?.nombre_categoria}
                                </p>
                                <span>
                                    {Number(producto.precio).toLocaleString(
                                        "es-CO",
                                        {
                                            style: "currency",
                                            currency: "COP"
                                        }
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="side-buttons">
                    <button
                        className="btn-side"
                        onClick={() => setMostrarMediosPago(true)}
                    >
                        Medio de pago
                    </button>
                    <button
                        className="btn-side"
                        onClick={() => setMostrarModalEnvio(true)}
                    >
                        Método de envío
                    </button>
                    <button
                        className="btn-side"
                        onClick={() => setMostrarModalProducto(true)}
                    >
                        <FaPlus />
                        Agregar producto
                    </button>
                </div>
            </div>

            {/* ========================================== */}
            {/* ZONA DE MODALES */}
            {/* ========================================== */}

            {/* Modal para editar la información del negocio */}
            <ModalEditarNegocio
                abierto={mostrarModal}
                negocio={negocio}
                onClose={() => setMostrarModal(false)}
                onActualizado={cargarNegocio} 
            />

            <ModalMediosPago
                abierto={mostrarMediosPago}
                idNegocio={negocio.id_negocio}
                onClose={() => setMostrarMediosPago(false)}
            />

            <ModalMetodosEnvio
                abierto={mostrarModalEnvio}
                onClose={() => setMostrarModalEnvio(false)}
                idNegocio={negocio.id_negocio}
            />

            <ModalProductos
                abierto={mostrarModalProducto}
                onClose={() => {
                    setMostrarModalProducto(false);
                    cargarNegocio();
                }}
                idNegocio={negocio.id_negocio}
            />

        </div>
    );
}