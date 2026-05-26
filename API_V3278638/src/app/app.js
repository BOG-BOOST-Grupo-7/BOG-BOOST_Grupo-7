import express from "express";
import morgan from "morgan";
import roleRouter from "../routers/role.router.js";
import userStatusRouter from "../routers/userStatus.router.js";
import categoryRouter from "../routers/category.router.js";

import userRouter from "../routers/user.router.js";
import productRouter from "../routers/product.router.js";


const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", roleRouter);
app.use("/api/v1", userStatusRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);

app.use((req, res, next) => {
    res.status(404).json({
        Message: "Endpoint losses"
    });
});

export default app;