import React from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa6";

const CartItem = ({ item }) => {
	const dispatch = useDispatch();

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
		console.log("add to cart" + product + qty);
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
		console.log("remove: " + id);
	};

	return (
		<div className="bg-white p-3 flex gap-3 items-center rounded-lg shadow-sm">
			<div>
				<img
					src={item.image}
					alt={item.name}
					className="h-20 object-cover rounded-md"
				/>
			</div>
			<div className="ml-3 flex-1 p-2 flex flex-col justify-between">
				<div className="flex justify-between items-start">
					<div>
						<Link
							to={`/product/${item._id}`}
							className="hover:cursor-pointer hover:text-gray-600"
						>
							<Typography variant="h3" className="font-medium text-lg">
								{item.name}
							</Typography>
						</Link>

						<Typography variant="paragraph" className="text-sm text-gray-600">
							Price: ${item.price}
						</Typography>
					</div>

					<button
						onClick={() => removeFromCartHandler(item._id)}
						className="text-inherit"
					>
						<FaTrash />
					</button>
				</div>

				<div className="flex justify-between items-center p-2">
					<div className="flex items-center space-x-2">
						<label htmlFor="quantity" className="text-sm font-semibold">
							Qty:
						</label>
						<select
							id="quantity"
							value={item.qty}
							onChange={(e) => addToCartHandler(item, Number(e.target.value))}
							className="border border-gray-300 rounded-full focus:outline-none py-1 px-2 text-sm"
						>
							{[...Array(item.countInStock).keys()].map((x) => (
								<option key={x + 1} value={x + 1}>
									{x + 1}
								</option>
							))}
						</select>
					</div>

					<Typography
						variant="paragraph"
						className="text-lg font-medium align-middle"
					>
						Total: ${(item.qty * item.price).toFixed(2)}
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
