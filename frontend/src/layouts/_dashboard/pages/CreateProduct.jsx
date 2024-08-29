import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import CustomInput from "../_components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../../redux/slices/productsApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CreateProduct = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [createProduct, { isSuccess }] = useCreateProductMutation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) {
			toast.success("Product created successfuly");
			navigate("/dashboard/products");
		}
	}, [isSuccess, navigate]);

	const onSubmit = async (data) => {
		try {
			console.log(data);
			await createProduct(data);
		} catch (error) {
			console.error("Error creating product:", error);
		}
	};

	return (
		<>
			<Link to="/dashboard/products" className="btn secondary-btn">
				Go Back
			</Link>
			<div className="container mx-auto mt-10 p-4">
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="w-full flex-col justify-between gap-4 mb-6">
						<CustomInput
							type="text"
							label="Name"
							placeholder="Product Name"
							name="name"
							register={register}
							error={errors.name}
						/>
						<CustomInput
							type="text"
							label="Image Url"
							placeholder="Product URL"
							name="image"
							register={register}
							error={errors.image}
						/>
						<div>
							<label>Product Description</label>
							<textarea
								name="description"
								id="description"
								{...register("description", {
									required: `description is required`,
								})}
								className={`mt-1 block w-full px-3 py-2 border ${
									errors.description ? "border-red-500" : "border-gray-300"
								} rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm`}
							/>
						</div>
					</div>

					<div className="w-full grid grid-cols-2 justify-between items-center gap-4 ">
						<CustomInput
							type="text"
							label="Brand"
							placeholder="Product Brand"
							name="brand"
							register={register}
							error={errors.brand}
						/>
						<CustomInput
							type="text"
							label="Category"
							placeholder="Product Category"
							name="category"
							register={register}
							error={errors.category}
						/>
						<CustomInput
							type="number"
							label="Price"
							placeholder="Product Price"
							name="price"
							register={register}
							error={errors.price}
						/>
						<CustomInput
							type="number"
							label="Count In Stock"
							placeholder="Count In Stock"
							name="countInStock"
							register={register}
							error={errors.countInStock}
						/>
					</div>
					<Button type="submit" className="btn primary-btn float-right">
						Create Product
					</Button>
				</form>
			</div>
		</>
	);
};

export default CreateProduct;
