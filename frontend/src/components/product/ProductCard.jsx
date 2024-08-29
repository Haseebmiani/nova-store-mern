import { Link } from "react-router-dom";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Rating,
} from "@material-tailwind/react";

export default function ProductCard({ product }) {
	function trimText(text, maxLength) {
		if (text.length <= maxLength) {
			return text;
		}
		return text.slice(0, maxLength) + "...";
	}

	if (!product) {
		return <p>Product data is missing or invalid.</p>;
	}

	const productRating = (Math.round(product.rating * 10) / 10).toFixed(1); // 3 --> 3.0

	return (
		product && (
			<Card className="w-64">
				<CardHeader shadow={false} floated={false} className="h-48">
					<Link to={`/product/${product._id}`}>
						<img
							src={product.image}
							alt="card-img"
							className="h-full w-full object-cover"
						/>
					</Link>
				</CardHeader>
				<CardBody>
					<div className="mb-2 flex items-center justify-between">
						<Link to={`/product/${product._id}`} className="hover:underline">
							<Typography color="blue-gray" className="font-medium">
								{trimText(product.name, 40)}
							</Typography>
						</Link>
					</div>
					<div>
						<Typography
							color="blue-gray"
							className="font-medium text-lg text-orange-800"
						>
							${product.price}
						</Typography>
					</div>
					<div className="flex items-center gap-2">
						<Rating value={Math.round(product.rating)} readonly />
						<span className="font-medium">({productRating})</span>
					</div>
				</CardBody>
			</Card>
		)
	);
}
