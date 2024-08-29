import React from "react";
import { Alert, Typography } from "@material-tailwind/react";
import Loader from "../../../components/Loader";
import { useGetProductsQuery } from "../../../redux/slices/productsApiSlice";
import ProductList from "../../../components/product/ProductList";
import Hero from "../../../components/Hero";

const HomeScreen = () => {
	const { data, isLoading, isError, error } = useGetProductsQuery({});

	if (isLoading) {
		return <Loader />;
	}

	if (isError && error) {
		return <Alert color="red">{error}</Alert>;
	}

	return (
		<div className="mt-6">
			<Hero />
			{data && Array.isArray(data.doc) && data.doc.length > 0 ? (
				<>
					<Typography variant="h3" className="primary-heading mt-4">
						Most popular products
					</Typography>
					<ProductList products={data?.doc} />
				</>
			) : (
				<div className="error-box">
					<p>Products not found!</p>
				</div>
			)}
		</div>
	);
};

export default HomeScreen;
