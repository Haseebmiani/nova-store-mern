import { Schema, model } from "mongoose";

const orderSchema = new Schema(
	{
		customer: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		postalCode: {
			type: Number,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		totalQty: {
			type: Number,
			required: true,
		},
		totalAmount: {
			type: Number,
			required: true,
		},
		paymentMethod: {
			type: String,
			enum: ["COD"],
			default: "COD",
		},
	},
	{
		timestamps: true,
	}
);

const Order = model("Order", orderSchema);

export default Order;
