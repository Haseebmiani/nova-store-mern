import { useForm } from "react-hook-form";
import CustomInput from "../../_dashboard/_components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../redux/slices/ordersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { clearCartItems } from "../../../redux/slices/cartSlice";

const CheckoutScreen = () => {
	const storedData = JSON.parse(localStorage.getItem("checkoutData")) || {};
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const [createOrder, { isLoading: orderCreating }] = useCreateOrderMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: storedData,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let products = [];

	const onSubmit = async (data) => {
		// Store all the form data in local storage
		localStorage.setItem("checkoutData", JSON.stringify(data));

		cartItems.forEach((item) => {
			products.push(item._id);
		});

		const totalQty = cartItems.reduce((a, c) => a + c.qty, 0);

		const order = {
			...data,
			products,
			totalQty,
			totalAmount: cart.itemsPrice,
		};
		await createOrder(order);

		if (!orderCreating) {
			navigate("/thank-you");
			dispatch(clearCartItems());
		}
	};

	return (
		<div className="container mx-auto mt-10 py-6">
			<h1 className="text-2xl font-bold mb-6">Checkout</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<CustomInput
						type="text"
						label="Address"
						placeholder=""
						name="address"
						register={register}
						error={errors.address}
					/>
				</div>
				<div className="mb-4">
					<CustomInput
						type="text"
						label="Phone Number"
						placeholder=""
						name="phoneNumber"
						register={register}
						error={errors.phoneNumber}
					/>
				</div>
				<div className="mb-4">
					<CustomInput
						type="number"
						label="Postal Code"
						placeholder=""
						name="postalCode"
						register={register}
						error={errors.postalCode}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Payment Method
					</label>
					<select
						className="custom-input"
						defaultValue="COD"
						{...register("paymentMethod")}
					>
						<option value="COD">Cash on Delivery</option>
					</select>
				</div>
				<Button type="submit" className="btn primary-btn float-right">
					Place Order
				</Button>
			</form>
		</div>
	);
};

export default CheckoutScreen;
