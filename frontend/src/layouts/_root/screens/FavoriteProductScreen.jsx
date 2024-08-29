import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import FavoriteCart from "../../../components/cart/FavoriteCart";

const FavoriteProductScreen = () => {
	const favoriteProducts = useSelector((state) => state.favoriteProducts);

	useEffect(() => {}, [favoriteProducts, favoriteProducts?.products]);

	return (
		<div className="p-4 mx-auto w-3/4">
			{favoriteProducts &&
			favoriteProducts?.products &&
			favoriteProducts?.products?.length > 0 ? (
				<>
					<div className="flex justify-between w-3/5 mx-10 p-2">
						<Typography
							variant="h3"
							className="text-xlg broder bottom-1 w-full mb-3"
						>
							Your favorite products
						</Typography>
					</div>

					<div className="w-11/12 px-4 py-2 mx-auto flex flex-col justify-between gap-4 md:flex-row">
						<FavoriteCart items={favoriteProducts?.products} />
					</div>
				</>
			) : (
				<div className="text-center p-5 flex flex-col gap-10 items-center justify-center h-96">
					<Typography variant="h3"> Empty favorite product List!</Typography>
				</div>
			)}
		</div>
	);
};

export default FavoriteProductScreen;
