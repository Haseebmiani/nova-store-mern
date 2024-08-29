import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

export const createProduct = catchAsync(async (req, res) => {
	const userId = req.user._id;

	const { name, image, description, price, brand, category, countInStock } =
		req.body;

	const newProduct = {
		user: userId,
		name,
		image,
		description,
		price,
		brand,
		category,
		countInStock,
	};

	const doc = await Product.create(newProduct);

	res.status(201).json({
		status: "success",
		doc,
	});
});
export const getProducts = getAll(Product);
export const getProduct = getOne(Product);
export const deleteProduct = deleteOne(Product);
export const updateProduct = updateOne(Product);

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = catchAsync(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = catchAsync(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.json(products);
});
