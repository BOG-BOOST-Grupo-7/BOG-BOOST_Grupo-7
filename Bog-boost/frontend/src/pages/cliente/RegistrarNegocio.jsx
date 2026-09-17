import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subirLogo as subirLogoApi } from "../../api/uploadApi";
import { registrarNegocio } from "../../api/negocioApi";
import { obtenerMiPerfil } from "../../api/perfilApi";
import "../../styles/RegistrarNegocio.css";

function RegistrarNegocio() {
    const navigate = useNavigate();
    const [cargandoPerfil, setCargandoPerfil] = useState(true);

    const [datos, setDatos] = useState({
        nombre_negocio: "",
        descripcion_negocio: "",
        telefono_negocio: "",
        numero_puesto: "",
        logo: ""
    });

    const [subiendoLogo, setSubiendoLogo] = useState(false);
    const [previewLogo, setPreviewLogo] = useState("");

    // Validar perfil antes de permitir registrar el negocio
    useEffect(() => {
        const verificarPerfil = async () => {
            try {
                const perfil = await obtenerMiPerfil();

                // Define aquí los campos obligatorios que el usuario debe tener llenos
                const perfilIncompleto = 
                    !perfil.primer_nombre || 
                    !perfil.primer_apellido || 
                    !perfil.id_tipo_documento || 
                    !perfil.numero_documento;

                if (perfilIncompleto) {
                    alert("Por favor, completa la información de tu perfil personal antes de registrar un negocio.");
                    navigate("/perfil"); // Ajusta la ruta a tu vista de perfil si es diferente
                }
            } catch (error) {
                console.error("Error al verificar el perfil:", error);
                alert("No se pudo verificar tu perfil. Inicia sesión nuevamente.");
            } finally {
                setCargandoPerfil(false);
            }
        };

        verificarPerfil();
    }, [navigate]);

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const subirLogo = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Solo se permiten imágenes.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("La imagen no puede superar los 5 MB.");
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
                                "La imagen es demasiado grande. Máximo 2500x2500 píxeles."
                            )
                        );
                    } else {
                        resolve();
                    }
                };
            });

            setPreviewLogo(URL.createObjectURL(file));
            setSubiendoLogo(true);

            const respuesta = await subirLogoApi(file);

            setDatos((prev) => ({
                ...prev,
                logo: respuesta.url
            }));
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.mensaje ||
                error.message ||
                "Error al subir el logo."
            );
        } finally {
            setSubiendoLogo(false);
        }
    };

    const guardarSolicitud = async (e) => {
        e.preventDefault();

        if (!datos.logo) {
            alert("Debes subir el logo del negocio.");
            return;
        }

        if (!datos.nombre_negocio.trim()) {
            alert("Ingresa el nombre del negocio.");
            return;
        }

        if (!datos.descripcion_negocio.trim()) {
            alert("Ingresa una descripción.");
            return;
        }

        if (!datos.telefono_negocio.trim()) {
            alert("Ingresa el teléfono.");
            return;
        }

        if (!datos.numero_puesto) {
            alert("Ingresa el número del puesto.");
            return;
        }

        try {
            const respuesta = await registrarNegocio({
                ...datos,
                numero_puesto: Number(datos.numero_puesto)
            });

            alert(respuesta.mensaje);

            setDatos({
                nombre_negocio: "",
                descripcion_negocio: "",
                telefono_negocio: "",
                numero_puesto: "",
                logo: ""
            });
            setPreviewLogo("");

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.mensaje ||
                "Error al registrar el negocio"
            );
        }
    };

    // Mostrar pantalla de carga mientras valida el perfil
    if (cargandoPerfil) {
        return (
            <main className="registro-negocio-container">
                <div className="registro-negocio-card">
                    <p style={{ textAlign: "center", padding: "20px" }}>Verificando información del perfil...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="registro-negocio-container">
            <div className="registro-negocio-card">
                <h1>
                    Solicitud de Registro de Negocio
                </h1>
                <p>
                    Solo se aceptan negocios que tengan un puesto fijo dentro del Mercado de las Pulgas San Alejo.
                </p>
                <form onSubmit={guardarSolicitud}>
                    <label> <i className="fas fa-image"></i>Logo del negocio</label>

                    <label className="logo-upload">
                        {previewLogo ? (
                            <img
                                src={previewLogo}
                                alt="Logo del negocio"
                                className="preview-logo"
                            />
                        ) : (
                            <>
                                <div className="logo-icon">
                                    🏪
                                </div>
                                <p>Haz clic para seleccionar el logo</p>
                                <small>
                                    PNG, JPG o WEBP (máx. 5 MB)
                                </small>
                            </>
                        )}

                        <input
                            type="file"
                            hidden
                            accept="image/png,image/jpeg,image/webp"
                            onChange={subirLogo}
                        />
                    </label>

                    {subiendoLogo && (
                        <div className="uploading">
                            ⏳ Subiendo logo...
                        </div>
                    )}

                    {previewLogo && !subiendoLogo && (
                        <button
                            type="button"
                            className="btn-eliminar-logo"
                            onClick={() => {
                                setPreviewLogo("");
                                setDatos((prev) => ({
                                    ...prev,
                                    logo: ""
                                }));
                            }}
                        >
                            🗑 Cambiar logo
                        </button>
                    )}

                    <label> <i className="fas fa-store"></i> Nombre del negocio</label>
                    <input
                        type="text"
                        name="nombre_negocio"
                        value={datos.nombre_negocio}
                        onChange={(e) => {
                            const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                            setDatos({
                                ...datos,
                                nombre_negocio: soloLetras
                            });
                        }}
                    />

                    <label><i className="fas fa-align-left"></i>Descripción</label>
                    <textarea
                        name="descripcion_negocio"
                        value={datos.descripcion_negocio}
                        onChange={handleChange}
                    />

                    <label><i className="fas fa-phone"></i>Teléfono</label>
                    <input
                        type="text"
                        name="telefono_negocio"
                        inputMode="numeric"
                        value={datos.telefono_negocio}
                        onChange={(e) => {
                            const soloNumeros = e.target.value.replace(/\D/g, "");
                            setDatos({
                                ...datos,
                                telefono_negocio: soloNumeros
                            });
                        }}
                    />

                    <label><i className="fas fa-map-marker-alt"></i>Número del puesto</label>
                    <input
                        type="text"
                        name="numero_puesto"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={datos.numero_puesto}
                        onChange={(e) => {
                            const soloNumeros = e.target.value.replace(/\D/g, "");
                            setDatos({
                                ...datos,
                                numero_puesto: soloNumeros
                            });
                        }}
                    />

                    <button
                        type="submit"
                        className="btn-registrar"
                        disabled={subiendoLogo}
                    >
                        {subiendoLogo
                            ? "Subiendo logo..."
                            : "Enviar solicitud"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default RegistrarNegocio;