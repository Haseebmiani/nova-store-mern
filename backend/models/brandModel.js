import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide brand."],
			unique: true,
		},
		logo: string,
		slug: string,
	},
	{
		timestamps: true,
	}
);

brandSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
