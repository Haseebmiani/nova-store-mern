import React from "react";
import Loader from "../../../components/Loader";
import { useGetOrdersQuery } from "../../../redux/slices/ordersApiSlice";
import ErrorMessage from "./../../../components/ErrorMessage";
import OrdersTable from "../_components/OrdersTable";

const Orders = () => {
	const { data: orders, isLoading, isError, error } = useGetOrdersQuery({});

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			{error && isError && <ErrorMessage error={error} />}
			<h1 className="text-4xl text-yellow-900 font-bold ml-6">All Orders</h1>
			<OrdersTable data={orders?.doc} />
		</div>
	);
};

export default Orders;
