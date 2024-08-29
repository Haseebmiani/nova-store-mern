import express from "express";

import {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts,
} from "../controllers/productController.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router
	.route("/")
	.get(getProducts)
	.post(protect, restrictTo("admin"), createProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

router.get("/top", getTopProducts);
router
	.route("/:id")
	.get(checkObjectId, getProduct)
	.put(protect, restrictTo("admin"), checkObjectId, updateProduct)
	.delete(protect, restrictTo("admin"), checkObjectId, deleteProduct);

export default router;
