import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, link }) => {
	return (
		<div className="bg-white shadow-md p-8 rounded-lg flex justify-between">
			<div className="flex flex-col justify-between items-center gap-10">
				<h3 className="text-lg font-semibold text-blue-gray-800">{title}</h3>
				<div className="text-5xl text-blue-500 rounded-full bg-blue-gray-50 p-4">
					<Icon />
				</div>
				{link ? (
					<Link
						to={link}
						className="flex justify-between items-center text-gray-700 gap-1"
					>
						<span>view more</span>
						<FaArrowRight />
					</Link>
				) : (
					<div></div>
				)}
			</div>
			<p className="text-gray-500 text-5xl font-semibold self-center">
				{value}
			</p>
		</div>
	);
};

export default StatCard;
