import supabase from "../services/supabase.js";
import crypto from "crypto";

export const subirLogo = async (req, res) => {

    try {

        // Verificar que se envió un archivo
        if (!req.file) {
            return res.status(400).json({
                mensaje: "Debe seleccionar una imagen."
            });
        }

        const archivo = req.file;

        // Obtener la extensión del archivo
        const extension = archivo.originalname
            .split(".")
            .pop();

        // Nombre único
        const nombreArchivo =
            `${crypto.randomUUID()}.${extension}`;

        // Subir al bucket
        const { error } = await supabase.storage
            .from("logos-negocios")
            .upload(
                nombreArchivo,
                archivo.buffer,
                {
                    contentType: archivo.mimetype,
                    upsert: false
                }
            );

        if (error) {

            console.error(error);

            return res.status(500).json({
                mensaje: "No fue posible subir el logo.",
                error: error.message
            });

        }

        // Obtener URL pública
        const { data } = supabase.storage
            .from("logos-negocios")
            .getPublicUrl(nombreArchivo);

        return res.status(200).json({

            mensaje: "Logo subido correctamente.",

            url: data.publicUrl

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            mensaje: "Error interno del servidor."

        });

    }

};

export const subirImagenProducto = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                mensaje: "Debe seleccionar una imagen."
            });
        }

        const archivo = req.file;

        const extension = archivo.originalname
            .split(".")
            .pop();

        const nombreArchivo =
            `${crypto.randomUUID()}.${extension}`;

        const { error } = await supabase.storage
            .from("imagenes-productos")
            .upload(
                nombreArchivo,
                archivo.buffer,
                {
                    contentType: archivo.mimetype,
                    upsert: false
                }
            );

        if (error) {

            return res.status(500).json({
                mensaje: "No fue posible subir la imagen.",
                error: error.message
            });

        }

        const { data } = supabase.storage
            .from("imagenes-productos")
            .getPublicUrl(nombreArchivo);

        res.json({
            mensaje: "Imagen subida correctamente",
            url: data.publicUrl
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error interno"
        });

    }

};

export const subirFotoPerfil = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                mensaje: "Debe seleccionar una imagen."
            });
        }

        const archivo = req.file;
        const idPerfil = req.user.id; // Requerimos el authMiddleware en la ruta

        const extension = archivo.originalname.split(".").pop();
        const nombreArchivo = `${crypto.randomUUID()}.${extension}`;

        // 1. Subir la imagen al bucket
        const { error: errorUpload } = await supabase.storage
            .from("fotos-perfil")
            .upload(
                nombreArchivo,
                archivo.buffer,
                {
                    contentType: archivo.mimetype,
                    upsert: false
                }
            );

        if (errorUpload) {
            console.error("Error al subir foto:", errorUpload);
            return res.status(500).json({
                mensaje: "No fue posible subir la foto de perfil.",
                error: errorUpload.message
            });
        }

        // 2. Obtener la URL pública
        const { data } = supabase.storage
            .from("fotos-perfil")
            .getPublicUrl(nombreArchivo);

        const urlFoto = data.publicUrl;

        // 3. Actualizar la tabla cliente.perfil automáticamente
        const { error: errorUpdate } = await supabase
            .schema("cliente")
            .from("perfil")
            .update({ foto_perfil: urlFoto })
            .eq("id_perfil", idPerfil);

        if (errorUpdate) {
            console.error("Error al actualizar perfil:", errorUpdate);
            return res.status(500).json({
                mensaje: "La imagen se subió pero no se guardó en el perfil.",
                error: errorUpdate.message
            });
        }

        // 4. Responder al frontend
        res.json({
            mensaje: "Foto de perfil actualizada correctamente",
            url: urlFoto
        });

    } catch (error) {
        console.error("Error en subirFotoPerfil:", error);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
};