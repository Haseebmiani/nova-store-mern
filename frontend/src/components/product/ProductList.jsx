import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
	return (
		<div className="flex flex-wrap w-3/4 mx-auto justify-center items-center gap-4 mt-4 p-4 ">
			{products.map((product) => (
				<ProductCard key={product._id} product={product} />
			))}
		</div>
	);
};

export default ProductList;
