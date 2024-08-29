import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loader = () => {
	return (
		<Spinner
			className="h-screen w-24 mx-auto mt-5 p-5 flex place-content-center"
			color="blue"
		/>
	);
};

export default Loader;
