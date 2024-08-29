import { Link } from "react-router-dom";

const ThankYouScreen = () => {
	return (
		<div className="text-center">
			<h1 className="text-5xl font-bold mb-16 text-orange-700">
				🛒Thank You for Your Order!👋
			</h1>
			<div className="flex md:flex-row flex-col gap-4 py-6 items-center justify-center">
				<img
					src="/images/brand/order.jpg"
					alt="Thank You"
					width={400}
					height={400}
					className="h-1/2 object-cover mb-6 rounded-lg shadow-lg"
				/>
				<div className="flex flex-col gap-4 w-2/3 justify-center items-center">
					<p className="text-4xl text-blue-gray-800  p-3  font-semibold ">
						✅ We have received your order and it's being processed. We'll
						notify you once it's on its way.
					</p>
					<Link to="/" className="btn bg-yellow-700 shadow-sm">
						Shopping More...
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ThankYouScreen;
