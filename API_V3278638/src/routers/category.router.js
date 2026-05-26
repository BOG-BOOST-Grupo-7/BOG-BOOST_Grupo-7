import { Router } from "express";
import CategoryController from "../controller/category.controller.js";
import categorySchema from "../schemes/category.schema.js";
import categoryMiddleware from "../middlewares/category.middleware.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const router = Router();

router.post("/category", verifyToken, categoryMiddleware(categorySchema.createCategory), CategoryController.createCategory);
router.post("/category/subcategory", verifyToken, categoryMiddleware(categorySchema.createCategory), CategoryController.createSubcategory);
router.get("/category", verifyToken, CategoryController.showCategories);
router.get("/category/roots", verifyToken, CategoryController.showRootCategories);
router.get("/category/:id/subcategories", verifyToken, CategoryController.showSubcategories);
router.get( "/category/:id", verifyToken, CategoryController.showCategoryId);
router.put("/category/:id", verifyToken, categoryMiddleware(categorySchema.updateCategory), CategoryController.updateCategory);
router.patch("/category/:id/status", verifyToken, categoryMiddleware(categorySchema.updateCategoryStatus), CategoryController.changeCategoryStatus);
router.delete("/category/:id", verifyToken, CategoryController.deleteCategory);

export default router;

// verifyToken