import React from "react";

const CustomInput = ({ type, label, placeholder, name, register, error }) => {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700">{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				{...register(name, { required: `${label} is required` })}
				className={`custom-input ${
					error ? "border-red-500" : "border-gray-300"
				}`}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
		</div>
	);
};

export default CustomInput;
