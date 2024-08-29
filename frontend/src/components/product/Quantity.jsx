import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Quantity = ({ product, qty, setQty }) => {
	const increaseQty = () => {
		if (qty < product.countInStock) {
			setQty(qty + 1);
		}
	};

	const decreaseQty = () => {
		if (qty > 1) {
			setQty(qty - 1);
		}
	};

	return (
		<div className="flex items-center">
			<button
				onClick={decreaseQty}
				className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
			>
				<FaMinus />
			</button>
			<input
				type="number"
				value={qty}
				readOnly
				className="w-16 p-2 text-center border border-gray-300 rounded-md mx-2 focus:outline-none"
			/>
			<button
				onClick={increaseQty}
				className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none "
			>
				<FaPlus />
			</button>
		</div>
	);
};

export default Quantity;
