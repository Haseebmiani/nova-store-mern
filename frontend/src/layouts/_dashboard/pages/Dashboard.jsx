import React from "react";
import {
	FaShoppingCart,
	FaBox,
	FaUsers,
	FaMoneyBillWave,
} from "react-icons/fa";
import StatCard from "./../_components/StatCard";
import { useGetProductsQuery } from "../../../redux/slices/productsApiSlice";
import { useGetOrdersQuery } from "../../../redux/slices/ordersApiSlice";
import { useGetUsersQuery } from "../../../redux/slices/usersApiSlice";

const Dashboard = () => {
	const { data: products } = useGetProductsQuery({});
	const { data: orders } = useGetOrdersQuery({});
	const { data: users } = useGetUsersQuery({});

	const totalOrders = orders?.doc?.length || 0;
	const totalProducts = products?.doc?.length || 0;
	const totalUsers = users?.doc?.length || 0;
	const totalEarning = orders?.doc?.reduce((a, c) => a + c.totalAmount, 0);

	// Mock data for statistics
	const statistics = [
		{
			title: "Total Orders",
			value: totalOrders,
			icon: FaShoppingCart,
			link: "/dashboard/orders",
		},
		{
			title: "Total Products",
			value: totalProducts,
			icon: FaBox,
			link: "/dashboard/products",
		},
		{
			title: "Total Users",
			value: totalUsers,
			icon: FaUsers,
			link: "/dashboard/users",
		},
		{
			title: "Total Earnings",
			value: totalEarning,
			icon: FaMoneyBillWave,
			link: null,
		},
	];

	return (
		<div className="container h-[80vh] p-2 mx-auto my-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
			{statistics.map((stat, index) => (
				<StatCard key={index} {...stat} />
			))}
		</div>
	);
};

export default Dashboard;
