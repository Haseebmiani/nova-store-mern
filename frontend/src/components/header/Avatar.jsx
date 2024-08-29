import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ username }) => {
	// const randomColorClass = `bg-${Math.floor(Math.random() * 16) + 1}00`;

	// Get the first letter of the username
	const firstLetter = username.charAt(0).toUpperCase();

	return (
		<div
			className={`w-10 h-10 bg-blue-gray-500  text-white rounded-full flex items-center justify-center font-semibold text-lg`}
		>
			{firstLetter}
		</div>
	);
};

Avatar.propTypes = {
	username: PropTypes.string.isRequired,
};

export default Avatar;
