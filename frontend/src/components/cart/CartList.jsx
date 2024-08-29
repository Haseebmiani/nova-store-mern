import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items }) => {
	return (
		<div className="flex flex-col gap-3 flex-1">
			{items.map((item) => (
				<CartItem key={item._id} item={item} />
			))}
		</div>
	);
};

export default CartList;
