import PropTypes from "prop-types";

const OrdersTable = ({ data }) => {
	return data ? (
		<div className="overflow-x-auto m-4 shadow-md rounded-md">
			<table className="min-w-full table-auto">
				<thead>
					<tr className="bg-yellow-900 text-white">
						<th className="py-2 px-4 text-left">Order ID</th>
						<th className="py-2 px-4 text-left">Customer ID</th>
						<th className="py-2 px-4 text-left">Address</th>
						<th className="py-2 px-4 text-left">Total Qty</th>
						<th className="py-2 px-4 text-left">Total Amount</th>
					</tr>
				</thead>
				<tbody>
					{data?.length > 0 ? (
						data.map((item, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
							>
								<td className="py-2 px-4">{item._id}</td>
								<td className="py-2 px-4">{item?.customer}</td>
								<td className="py-2 px-4">{item.address}</td>
								<td className="py-2 px-4">{item.totalQty}</td>
								<td className="py-2 px-4">{item.totalAmount}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={4} className="py-4 px-4 text-center">
								No orders available!
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	) : null;
};

OrdersTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};

export default OrdersTable;
