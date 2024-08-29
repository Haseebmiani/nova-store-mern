import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** COMPONENTS ** //
import Loader from "./components/Loader";
import RootLayout from "./layouts/_root/RootLayout";
import AuthLayout from "./layouts/_auth/AuthLayout";
import SignInForm from "./layouts/_auth/form/SignInForm";
import SignUpForm from "./layouts/_auth/form/SignUpForm";
import Products from "./layouts/_dashboard/pages/Products";
import Users from "./layouts/_dashboard/pages/Users";
import FavoriteProductScreen from "./layouts/_root/screens/FavoriteProductScreen";
import CreateProduct from "./layouts/_dashboard/pages/CreateProduct";
import Orders from "./layouts/_dashboard/pages/Orders";
import ThankYouScreen from "./layouts/_root/screens/ThankYouScreen";
import EditProduct from "./layouts/_dashboard/pages/EditProduct";
const NotFound = lazy(() => import("./components/NotFound"));

// ** SCREENS OR LAYOUTS ** //
const HomeScreen = lazy(() => import("./layouts/_root/screens/HomeScreen"));
const ProductScreen = lazy(() =>
	import("./layouts/_root/screens/ProductScreen")
);
const ProfileScreen = lazy(() =>
	import("./layouts/_root/screens/ProfileScreen")
);
const CartScreen = lazy(() => import("./layouts/_root/screens/CartScreen"));
const CheckoutScreen = lazy(() =>
	import("./layouts/_root/screens/CheckoutScreen")
);
const DashboardLayout = lazy(() =>
	import("./layouts/_dashboard/DashboardLayout")
);
const Dashboard = lazy(() => import("./layouts/_dashboard/pages/Dashboard"));

function App() {
	return (
		<div className="app">
			{/* ToastConatiner For Status -- Error, Success, Failed */}
			<ToastContainer />
			<Suspense fallback={<Loader />}>
				<Routes>
					{/* Auth Layout  */}
					<Route path="/auth" element={<AuthLayout />}>
						<Route path="/auth/sign-in" element={<SignInForm />} />
						<Route path="/auth/sign-up" element={<SignUpForm />} />
					</Route>

					{/* Public */}
					<Route path="/" element={<RootLayout />}>
						<Route index element={<HomeScreen />} />
						<Route path="/product/:productId" element={<ProductScreen />} />
						<Route
							path="/favorite-products"
							element={<FavoriteProductScreen />}
						/>
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/cart" element={<CartScreen />} />
						<Route path="/checkout" element={<CheckoutScreen />} />
						<Route path="/thank-you" element={<ThankYouScreen />} />
					</Route>

					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="/dashboard/products" element={<Products />} />
						<Route
							path="/dashboard/products/:productId"
							element={<EditProduct />}
						/>
						<Route path="/dashboard/orders" element={<Orders />} />
						<Route path="/dashboard/users" element={<Users />} />
						<Route
							path="/dashboard/create-product"
							element={<CreateProduct />}
						/>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
