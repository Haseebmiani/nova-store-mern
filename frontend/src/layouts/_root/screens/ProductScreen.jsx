import React from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@material-tailwind/react";

import ProductDetails from "../../../components/product/ProductDetails";
import Loader from "../../../components/Loader";
import { useGetProductDetailsQuery } from "../../../redux/slices/productsApiSlice";


const ProductScreen = () => {
	const { productId } = useParams();

	const { data, isLoading, error } = useGetProductDetailsQuery(productId);
	const product = data?.doc;

	return isLoading ? (
		<Loader />
	) : error ? (
		<Alert color="red">{error}</Alert>
	) : data ? (
		<>
			<ProductDetails product={product} />
		</>
	) : (
		<p>Product details not found!</p>
	);
};

export default ProductScreen;
