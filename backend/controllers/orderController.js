import Order from "../models/orderModel.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne, updateOne } from "./handleFactory.js";

export const createOrder = catchAsync(async (req, res) => {
	const customer = req.user?._id;
	const {
		address,
		products,
		totalAmount,
		phoneNumber,
		postalCode,
		paymentMethod,
		totalQty,
	} = req.body;

	const newOrder = {
		customer,
		products,
		totalAmount,
		address,
		phoneNumber,
		postalCode,
		paymentMethod,
		totalQty,
	};

	const doc = await Order.create(newOrder);

	res.status(201).json({
		status: "success",
		doc,
	});
});
export const getOrders = getAll(Order);
export const getOrder = getOne(Order, ["products", "customerId"]);
export const deleteOrder = deleteOne(Order);
export const updateOrder = updateOne(Order);
