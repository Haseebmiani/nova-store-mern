import React from "react";

const ErrorMessage = React.memo(({ error }) => {
	if (error && error?.data && error?.data?.message?.includes("jwt")) {
		return (
			<div className="error-box flex flex-col gap-6">
				<h1 className="text-blue-gray-900">
					{error?.data?.error?.name}: {error?.data?.message}
				</h1>
				<p className=" text-blue-600">Note: Logout and Login again</p>
			</div>
		);
	}

	if (error?.data) {
		return (
			<div className="error-box">
				<h1 className="text-3xl">
					Error:{" "}
					<span className="text-blue-gray-800">{error?.data?.message}</span>{" "}
				</h1>
			</div>
		);
	} else return null;
});

export default ErrorMessage;
