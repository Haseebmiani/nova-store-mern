import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { clearCartItems } from "../../../redux/slices/cartSlice";
import CartList from "./../../../components/cart/CartList";
import CartSummary from "./../../../components/cart/CartSummary";

const CartScreen = () => {
	const { cartItems } = useSelector((state) => state.cart);
	console.log(cartItems);
	const dispatch = useDispatch();

	const clearCartHandler = () => {
		dispatch(clearCartItems());
	};

	return (
		<div className="p-4 mx-4">
			{cartItems && cartItems.length > 0 ? (
				<>
					<div className="flex justify-between w-3/5 mx-10 p-2">
						<Typography
							variant="h3"
							className="text-xlg broder bottom-1 w-full mb-3"
						>
							Shopping Cart
						</Typography>
						<Button
							variant="outlined"
							className="rounded-full w-44 h-12"
							onClick={clearCartHandler}
						>
							<span>Clear cart</span>
						</Button>
					</div>

					<div className="w-11/12 px-4 py-2 mx-auto flex flex-col justify-between gap-4 md:flex-row">
						<CartList items={cartItems} />
						<CartSummary />
					</div>
				</>
			) : (
				<div className="text-center p-5 flex flex-col gap-10 items-center justify-center h-96">
					<Typography variant="h3">Your Cart is empty!</Typography>
					<Link to="/">
						<Button variant="filled" className="rounded-full text-lg">
							Go to Shopping
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default CartScreen;
