import { Router } from "express";
import { protect, restrictTo } from "./../middleware/authMiddleware.js";
import {
	createOrder,
	updateOrder,
	deleteOrder,
	getOrder,
	getOrders,
} from "../controllers/orderController.js";

const router = Router();

router
	.route("/")
	.post(protect, createOrder)
	.get(protect, restrictTo("admin"), getOrders);
router
	.route("/:id")
	.get(protect, getOrder)
	.put(protect, updateOrder)
	.delete(protect, deleteOrder);

export default router;
