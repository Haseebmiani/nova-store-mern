import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../../../redux/slices/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";
import Loader from "../../../components/Loader";

const SignUpForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await register({ name, email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};
	return (
		<div className="w-fit mx-auto mt-2 p-8 bg-white shadow-lg rounded-xl">
			<Card color="transparent" shadow={false}>
				<Typography variant="h4" color="blue-gray">
					Sign Up
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Connect with Nova Store
				</Typography>
				<form
					onSubmit={submitHandler}
					className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
				>
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							label="Name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							size="lg"
							label="Email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div>
							<Input
								type="password"
								size="lg"
								label="Password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="flex items-center gap-2 mt-1">
								<FaInfoCircle className="text-blue-600" />
								<span className="text-xs">
									Password must be at least 6 characters.
								</span>
							</div>
						</div>
					</div>
					<Checkbox
						label={
							<Typography
								variant="small"
								color="gray"
								className="flex items-center font-normal"
							>
								I agree the
								<Link
									to="/"
									className="font-medium transition-colors hover:text-gray-900"
								>
									&nbsp;Terms and Conditions
								</Link>
							</Typography>
						}
						containerProps={{ className: "-ml-2.5" }}
					/>
					<Button
						type="submit"
						className="mt-6 bg-yellow-700 w-full text-black text-lg"
					>
						Register
					</Button>
					{isLoading && <Loader />}
				</form>
				<Typography color="gray" className="mt-4 text-center font-normal">
					Already have an account?{" "}
					<Link
						to="/auth/sign-in"
						className="font-medium text-gray-900 hover:underline"
					>
						Login
					</Link>
				</Typography>
			</Card>
		</div>
	);
};

export default SignUpForm;
