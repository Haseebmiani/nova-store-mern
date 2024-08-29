import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="">
			<img
				src="/images/brand/nova-logo.png"
				alt="nova store logo"
				width={200}
				height={200}
				className="mx-auto mt-1 p-2"
			/>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
