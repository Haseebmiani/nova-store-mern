import React, { useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./_components/Sidebar";
import {
	FaChartLine,
	FaBox,
	FaUsers,
	FaClipboardList,
	FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const sidebarItems = [
	{ name: "Dashboard", link: "/dashboard", icon: FaChartLine },
	{ name: "Products", link: "/dashboard/products", icon: FaBox },
	{ name: "Users", link: "/dashboard/users", icon: FaUsers },
	{ name: "Orders", link: "/dashboard/orders", icon: FaClipboardList },
	{ name: "Logout", link: "/logout", icon: FaSignOutAlt },
];

const DashboardLayout = () => {
	const userInfo = useSelector((state) => state.auth.userInfo);
	const navigate = useNavigate();
	const user = useMemo(() => userInfo?.user || [], [userInfo]);

	const isAdmin = user && user?.role === "admin";

	useEffect(() => {
		if (!isAdmin) {
			navigate("/");
		}
	}, [isAdmin, navigate, user]);

	if (!isAdmin) {
		return null;
	}

	return (
		<div className="flex justify-center w-full gap-4 h-screen">
			<Sidebar sidebarItems={sidebarItems} />
			<div className="flex flex-col flex-1 p-10 w-4/6">
				<div className="ml-[18rem]">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
