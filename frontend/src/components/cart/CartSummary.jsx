import React from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const CartSummary = () => {
	const cart = useSelector((state) => state.cart);

	// Calculate shipping, tax, and total prices
	const shippingPrice = cart?.shippingPrice; // Change this according to your requirements
	const taxPrice = cart?.taxPrice; // Change this according to your requirements

	const taxRate = cart?.taxRate;
	const subtotal = cart.itemsPrice;

	const totalItems = cart?.cartItems?.reduce((acc, item) => acc + item.qty, 0);
	const totalPrice = cart?.totalPrice;

	return (
		<div className="w-full p-5 md:w-1/3 rounded-lg bg-white self-start">
			<h1 className="text-2xl font-semibold">Cart Summary</h1>
			<div className="mt-4">
				<div className="flex justify-between mb-1">
					<Typography variant="paragraph">Total Items:</Typography>
					<Typography className="font-medium">{totalItems}</Typography>
				</div>
				<div className="flex justify-between mb-1">
					<Typography variant="paragraph">Subtotal:</Typography>
					<Typography className="font-medium">${subtotal}</Typography>
				</div>
				<div className="flex justify-between mb-1">
					<Typography variant="paragraph">Shipping:</Typography>
					<Typography className="font-medium">
						{shippingPrice > 0 ? (
							<span>${shippingPrice}</span>
						) : (
							<span className="text-green-800">Free</span>
						)}
					</Typography>
				</div>
				<div className="flex justify-between mb-1">
					<Typography variant="paragraph">Tax ({taxRate * 100}%):</Typography>
					<Typography className="font-medium">${taxPrice}</Typography>
				</div>
				<hr className="my-2" />
				<div className="flex justify-between mb-1">
					<Typography variant="paragraph">Total Price:</Typography>
					<Typography className="font-medium">${totalPrice}</Typography>
				</div>
			</div>
			<Link to="/checkout">
				<Button
					variant="filled"
					className="mt-4 bg-blue-500 text-white rounded-full w-full text-lg"
				>
					Proceed to Checkout
				</Button>
			</Link>
			<Link to="/">
				<Button
					variant="filled"
					className="mt-4 bg-orange-800 text-white rounded-full w-full text-lg"
				>
					Continue Shopping
				</Button>
			</Link>
		</div>
	);
};

export default CartSummary;
