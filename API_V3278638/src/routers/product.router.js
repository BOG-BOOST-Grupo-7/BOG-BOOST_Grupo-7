import { Router } from "express";
import ProductController from "../controller/product.controller.js";
import productScheme from "../schemes/product.schema.js";
import productMiddleware from "../middlewares/product.middleware.js";
import verifyToken from "../middlewares/jwt.middleware.js";

//import { createProduct, showProduct, showProductId, updateProduct, deleteProduct} from "../controller/product.controller.js";

const router = Router();

router.post("/product", productMiddleware(productScheme.createProduct), ProductController.createProduct);
router.get("/product", verifyToken, ProductController.showProduct);
router.get("/product/:id", verifyToken, ProductController.showProductId);
router.put("/product/:id", verifyToken, productMiddleware(productScheme.updateProduct), ProductController.updateProduct);
router.delete("/product/:id", verifyToken, ProductController.deleteProduct);

export default router;