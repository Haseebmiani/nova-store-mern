import mongoose from "mongoose";
import slugify from "slugify";

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		slug: String,
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
			set: (val) => (Math.round(val * 10) / 10).toFixed(1),
		},
		numReviews: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, "A product must have a price"],
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

productSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	console.log(this.slug);
	next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
