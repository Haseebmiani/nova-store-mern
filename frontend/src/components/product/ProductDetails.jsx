import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { Alert, Button, Rating, Typography } from "@material-tailwind/react";

import Loader from "../Loader";
import ProductList from "./ProductList";
import Quantity from "./Quantity";

import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { addViewedProduct } from "../../redux/slices/recentlyViewedSlice";
import {
	addToFavorites,
	removeFromFavorites,
} from "../../redux/slices/favoriteProductsSlice";
import { addToCart } from "./../../redux/slices/cartSlice";

const ProductDetails = ({ product }) => {
	const { data, isLoading, error } = useGetProductsQuery({
		category: product?.category,
	});

	const dispatch = useDispatch();

	const [qty, setQty] = useState(1);
	const [favorite, setFavorite] = useState(0);

	const isFavorite = favorite === 1;
	const buttonStyle = isFavorite
		? "bg-pink-500 text-white"
		: "bg-gray-100 text-black ";

	useEffect(() => {
		if (product) {
			dispatch(addViewedProduct(product._id));
			setQty(1);
		}
	}, [dispatch, product]);

	let filteredProducts;
	if (data && data.doc && product._id) {
		filteredProducts = data?.doc?.filter((p) => p._id !== product._id) || [];
	}

	const addToCartHandler = () => {
		console.log("qty: " + qty);
		dispatch(addToCart({ ...product, qty }));
	};

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <Alert color="red">{error}</Alert>;
	}

	const addFavoriteHandler = () => {
		setFavorite(isFavorite ? 0 : 1);
		if (!favorite) {
			console.log("favorite");
			dispatch(addToFavorites(product));
		} else {
			dispatch(removeFromFavorites(product._id));
		}
	};

	const productRating = (Math.round(product.rating * 10) / 10).toFixed(1);

	return (
		<>
			<div className="text-left p-2 mt-2 ml-5 ">
				<Link
					to="/"
					className="hover:underline text-gray-900 hover:text-blue-700 text-lg flex items-center gap-1"
				>
					<FaArrowLeft />
					<span>Go back</span>
				</Link>
			</div>
			<div className="flex flex-wrap justify-between items-start gap-4 w-4/5 p-2 mt-2 mb-5 mx-auto">
				{/* Product Image */}
				<div>
					<img
						className="h-1/2 w-full rounded-lg object-cover object-center shadow-md"
						src={product.image}
						alt={product.name}
						width={200}
						height={200}
					/>
				</div>

				{/* Product Details */}
				<div className="flex flex-col justify-start gap-3 lg:w-2/5 md:w-full text-left">
					<Typography variant="h3">{product.name}</Typography>

					<div className="flex items-center gap-2">
						<span className="font-medium">{productRating}</span>
						<Rating value={Math.round(product.rating)} readonly />
						<span className="text-blue-800 font-medium">
							{product.numReviews} ratings
						</span>
					</div>
					<Typography variant="paragraph">{product.description}</Typography>
					<div className="flex justify-between">
						<div className="flex flex-col gap-3">
							<Typography variant="paragraph">
								<span className="text-gray-700 mr-2">Brand:</span>
								<span>{product.brand}</span>
							</Typography>
							<Typography variant="paragraph">
								<span className="text-gray-700 mr-2">Category:</span>
								<span>{product.category}</span>
							</Typography>
							<Typography variant="paragraph">
								<span className="text-gray-700 mr-2">Price:</span>
								<span className="font-bold text-xl">${product.price}</span>
							</Typography>
						</div>
						<div className="flex flex-col gap-3">
							{product.countInStock > 1 ? (
								<Typography
									variant="paragraph"
									className="font-bold text-green-700 text-lg"
								>
									In Stock
								</Typography>
							) : product.countInStock === 1 ? null : (
								<Typography
									variant="paragraph"
									className="font-bold text-deep-orange-700 text-lg"
								>
									Out Stock
								</Typography>
							)}
							<Typography className="font-bold text-lg text-blue-500">
								Free Shipping
							</Typography>

							<div>
								{product.countInStock === 1 ? (
									<Typography
										variant="paragraph"
										className=" text-amber-900 font-bold"
									>
										Only 1 left in stock - order soon
									</Typography>
								) : product.countInStock > 1 ? (
									<>
										<Quantity qty={qty} setQty={setQty} product={product} />
										<span className="mx-3 px-1">
											{product.countInStock} pieces left
										</span>
									</>
								) : null}
							</div>
						</div>
					</div>

					<Link to="/cart">
						<Button
							className="bg-yellow-700 text-black text-sm w-full rounded-full"
							disabled={product.countInStock < 1}
							onClick={addToCartHandler}
						>
							Buy Now
						</Button>
					</Link>
					<div className="flex justify-between gap-2">
						<Button
							className="btn primary-btn flex-grow "
							onClick={addToCartHandler}
							disabled={product.countInStock < 1}
						>
							Add to Cart
						</Button>
						<button
							className={`align-middle flex justify-center items-center gap-3 select-none font-sans font-bold text-center uppercase
							transition-all py-3 shadow-md shadow-gray-900/10 hover:shadow-lghover:shadow-gray-900/20
							text-sm flex-grow rounded-full ${buttonStyle}`}
							onClick={addFavoriteHandler}
						>
							<span>Add to Favorite</span>
							<FaHeart fontSize={25} />
						</button>
					</div>
				</div>
			</div>

			{filteredProducts.length > 0 ? (
				<div className=" w-full mx-auto p-4 mt-3">
					<Typography variant="h4" className="font-bold text-center">
						Related Products
					</Typography>
					{filteredProducts && <ProductList products={filteredProducts} />}
				</div>
			) : null}
		</>
	);
};

export default ProductDetails;
