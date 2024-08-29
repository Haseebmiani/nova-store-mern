import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import ProductCard from "./ProductCard";
import { Alert, Typography } from "@material-tailwind/react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 1024 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 1024, min: 768 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 768, min: 640 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 640, min: 0 },
		items: 1,
	},
};

const ViewedProducts = () => {
	const { data, isLoading, isError, error } = useGetProductsQuery({});
	const recentlyViewed = useSelector((state) => state.recentlyViewed);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		if (data && data.doc) {
			// Step 1: Filter products based on recently viewed IDs
			const filtered = data.doc.filter((product) =>
				recentlyViewed.some((viewedItem) => viewedItem.id === product._id)
			);

			// Step 2: Sort the filtered products by timestamp in descending order
			filtered.sort((a, b) => {
				// Use the nullish coalescing operator (??) for default date value
				const dateA = Date.parse(a.timestamp ?? "1970-01-01T00:00:00");
				const dateB = Date.parse(b.timestamp ?? "1970-01-01T00:00:00");

				return dateB - dateA; // Sort in descending order
			});

			console.log("products viewed: ", filtered);
			setFilteredProducts(filtered);
			setLoading(false);
		}
	}, [data, recentlyViewed]);

	if (isError && error) {
		return <Alert color="red">{error}</Alert>;
	}

	if (loading) {
		return <Loader />;
	}

	const customLeftArrow = (
		<div className="arrow-btn absolute left-0 cursor-pointer rounded-full bg-orange-300 p-3 text-center">
			<FaAngleLeft />
		</div>
	);
	const customRightArrow = (
		<div className="arrow-btn absolute right-0 cursor-pointer rounded-full bg-orange-300 p-3 text-center">
			<FaAngleRight />
		</div>
	);

	return filteredProducts && filteredProducts.length > 0 ? (
		<div className="mt-5 p-3">
			<Typography variant="h3">User recently viewed products</Typography>
			<div className="mb-8 w-full mt-4">
				<Carousel
					infinite
					customLeftArrow={customLeftArrow}
					customRightArrow={customRightArrow}
					responsive={responsive}
					itemClass="px-4"
					className=""
				>
					{!isLoading &&
						filteredProducts.map((product, index) => (
							<ProductCard key={index} product={product} />
						))}
				</Carousel>
			</div>
		</div>
	) : null;
};

export default ViewedProducts;
