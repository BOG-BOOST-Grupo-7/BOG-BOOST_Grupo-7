import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Perfil.css";

import {
    obtenerMiPerfil,
    actualizarPerfil,
    desactivarCuenta
} from "../../api/perfilApi";

function Perfil() {
    const { logout } = useAuth();

    const fileInputRef = useRef(null);

    const [perfil, setPerfil] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        id_tipo_documento: "",
        numero_documento: "",
        email: "",
        foto_perfil: "",
    });

    const [editando, setEditando] = useState({});

    useEffect(() => {
        cargarPerfil();
    }, []);

    const cargarPerfil = async () => {
        try {
            const data = await obtenerMiPerfil();

            console.log("PERFIL RECIBIDO:", data);

            setPerfil({
                primer_nombre: data.primer_nombre || "",
                segundo_nombre: data.segundo_nombre || "",
                primer_apellido: data.primer_apellido || "",
                segundo_apellido: data.segundo_apellido || "",
                id_tipo_documento: data.id_tipo_documento || "",
                numero_documento: data.numero_documento || "",
                email: data.email || "",
                foto_perfil: data.foto_perfil || "",
            });
        } catch (error) {
            console.error("ERROR PERFIL:", error);
        }
    };

    const handleChange = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value,
        });
    };

    const toggleEdit = (campo) => {
        setEditando({
            ...editando,
            [campo]: !editando[campo],
        });
    };

    const guardarPerfil = async () => {
        try {

            const datos = {
                primer_nombre: perfil.primer_nombre,
                segundo_nombre: perfil.segundo_nombre,
                primer_apellido: perfil.primer_apellido,
                segundo_apellido: perfil.segundo_apellido,
            };

            if (perfil.id_tipo_documento !== "") {
                datos.id_tipo_documento = Number(
                    perfil.id_tipo_documento
                );
            }

            if (perfil.numero_documento !== "") {
                datos.numero_documento = Number(
                    perfil.numero_documento
                );
            }

            const respuesta = await actualizarPerfil(datos);

            console.log("RESPUESTA UPDATE:", respuesta);

            alert("Perfil actualizado correctamente");

            setEditando({});

        } catch (error) {

            console.error("ERROR UPDATE:", error);
            console.error("ERROR RESPONSE:", error.response);

            alert(
                error.response?.data?.message ||
                error.response?.data?.mensaje ||
                "Error al actualizar perfil"
            );
        }
    };
    const handleDesactivarCuenta = async () => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas desactivar tu cuenta?\n\nEsta acción impedirá que puedas iniciar sesión."
        );

        if (!confirmar) return;

        const texto = window.prompt(
            'Para confirmar escribe exactamente la palabra "DESACTIVAR"'
        );

        if (texto !== "DESACTIVAR") {
            alert("Confirmación incorrecta. La cuenta no fue desactivada.");
            return;
        }

        try {
            const respuesta = await desactivarCuenta();

            alert(
                respuesta?.mensaje ||
                "Cuenta desactivada correctamente"
            );

            logout();

            window.location.href = "/";
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al desactivar la cuenta"
            );
        }
    };

    const handleImagen = (file) => {
        if (!file) return;

        const preview = URL.createObjectURL(file);

        setPerfil((prev) => ({
            ...prev,
            foto_perfil: preview,
        }));
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        handleImagen(file);
    };

    const renderCampo = (label, campo, icono) => (
        <>
            <div className="info-field">
                <label>
                    <i className={icono}></i>
                    {label}
                </label>

                <div className="field-value">

                    {editando[campo] ? (

                        campo === "id_tipo_documento" ? (

                            <select
                                className="field-input-edit"
                                name="id_tipo_documento"
                                value={perfil.id_tipo_documento}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Seleccione...
                                </option>

                                <option value="1">
                                    Cédula de Ciudadanía
                                </option>

                                <option value="2">
                                    Cédula de Extranjería
                                </option>
                            </select>

                        ) : (

                            <input
                                className="field-input-edit"
                                name={campo}
                                value={perfil[campo]}
                                onChange={handleChange}
                            />

                        )

                    ) : (

                        <span className="field-text">
                            {campo === "id_tipo_documento"
                                ? perfil.id_tipo_documento === 1 ||
                                    perfil.id_tipo_documento === "1"
                                    ? "Cédula de Ciudadanía"
                                    : perfil.id_tipo_documento === 2 ||
                                        perfil.id_tipo_documento === "2"
                                        ? "Cédula de Extranjería"
                                        : "Sin registrar"
                                : perfil[campo] || "Sin registrar"}
                        </span>

                    )}

                    <button
                        type="button"
                        className="btn-edit-field"
                        onClick={() => toggleEdit(campo)}
                    >
                        <i className="fas fa-pen"></i>
                    </button>

                </div>
            </div>

            <hr className="field-divider" />
        </>
    );

    return (
        <main className="perfil-container">
            <h1 className="perfil-title">
                Perfil de Usuario
            </h1>

            <div className="perfil-card">

                <div className="avatar-section">
                    <div
                        className="avatar-container"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {perfil.foto_perfil ? (
                            <img
                                src={perfil.foto_perfil}
                                alt="Perfil"
                                className="avatar-image"
                            />
                        ) : (
                            <div className="avatar-circle">
                                {perfil.primer_nombre?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        )}

                        <div className="avatar-overlay">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p>Arrastra una imagen aquí</p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                                handleImagen(e.target.files?.[0])
                            }
                        />
                    </div>

                    <p className="avatar-texto">
                        🖱️ Haz clic o arrastra una imagen
                    </p>
                </div>

                <div className="perfil-info">

                    {renderCampo(
                        "Primer Nombre",
                        "primer_nombre",
                        "fas fa-user"
                    )}

                    {renderCampo(
                        "Segundo Nombre",
                        "segundo_nombre",
                        "fas fa-user"
                    )}

                    {renderCampo(
                        "Primer Apellido",
                        "primer_apellido",
                        "fas fa-user-tag"
                    )}

                    {renderCampo(
                        "Segundo Apellido",
                        "segundo_apellido",
                        "fas fa-user-tag"
                    )}

                    {renderCampo(
                        "Tipo Documento",
                        "id_tipo_documento",
                        "fas fa-id-card"
                    )}

                    {renderCampo(
                        "Número Documento",
                        "numero_documento",
                        "fas fa-address-card"
                    )}

                    <div className="info-field">
                        <label>
                            <i className="fas fa-envelope"></i>
                            Correo
                        </label>

                        <div className="field-value">
                            <span className="field-text">
                                {perfil.email}
                            </span>
                        </div>
                    </div>

                    <hr className="field-divider" />

                    <div className="perfil-actions">
                        <button
                            className="btn-guardar"
                            onClick={guardarPerfil}
                        >
                            <i className="fas fa-save"></i>
                            Guardar cambios
                        </button>

                        <button
                            className="btn-danger"
                            onClick={handleDesactivarCuenta}
                        >
                            <i className="fas fa-user-slash"></i>
                            Desactivar cuenta
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default Perfil;