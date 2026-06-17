import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import tipoDocumentoRoutes from "./routes/tipoDocumento.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";
import notificacionRoutes from "./routes/notificacion.routes.js";
import pqrsRoutes from "./routes/pqrs.routes.js";
import negocioRoutes from "./routes/negocio.routes.js";
import puestoRoutes from "./routes/puesto.routes.js";
import medioPagoRoutes from "./routes/medioPago.routes.js";
import metodoEnvioRoutes from "./routes/metodoEnvio.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/tipo-documento", tipoDocumentoRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/notificacion", notificacionRoutes);
app.use("/api/pqrs", pqrsRoutes);
app.use("/api/negocio", negocioRoutes);
app.use("/api/puestos", puestoRoutes);
app.use("/api/medios-pago", medioPagoRoutes);
app.use("/api/metodos-envio", metodoEnvioRoutes);

export default app;