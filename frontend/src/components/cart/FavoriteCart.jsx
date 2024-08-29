import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa6";
import { removeFromFavorites } from "../../redux/slices/favoriteProductsSlice";

const FavoriteCart = ({ items }) => {
	const dispatch = useDispatch();

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
		dispatch(removeFromFavorites(product._id));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromFavorites(id));
	};

	return (
		<div className="flex flex-col gap-3 flex-1">
			{items.map((item) => (
				<div
					key={item._id}
					className="bg-white p-3 flex gap-3 items-center rounded-lg shadow-sm"
				>
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

								<Typography
									variant="paragraph"
									className="text-sm text-gray-600"
								>
									Price: ${item.price}
								</Typography>
							</div>
						</div>

						<div className="flex justify-end gap-4 items-center p-2">
							<Button
								onClick={(e) => addToCartHandler(item, 1)}
								className="btn primary-btn"
							>
								Add to Cart
							</Button>
							<Button
								onClick={() => removeFromCartHandler(item._id)}
								className=" bg-red-200 text-white flex justify-center items-center gap-2 py-2 px-4"
							>
								<FaTrash />
								Clear
							</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FavoriteCart;
