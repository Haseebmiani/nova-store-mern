import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

const FileUploader = ({ fieldChange }) => {
	const [file, setFile] = useState([]);
	const [fileURL, setFileURL] = useState("");

	const onDrop = useCallback(
		(acceptedFiles) => {
			setFile(acceptedFiles);
			fieldChange(acceptedFiles);
			setFileURL(URL.createObjectURL(acceptedFiles[0]));
		},
		[fieldChange]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".svg"],
		},
	});

	return (
		<div
			{...getRootProps()}
			className="flex justify-center w-64 h-64 items-center p-2 flex-col bg-blue-gray-100 rounded-xl cursor-pointer "
		>
			<input
				{...getInputProps()}
				className="cursor-pointer flex justify-center items-center"
				name="productImage"
			/>
			{fileURL ? (
				<>
					<div className="flex flex-1 p-4">
						<img src={fileURL} alt="upload pic" className="file_uploader-img" />
					</div>
					<p className="file_uploader-label">Click or drag photo to replace</p>
				</>
			) : (
				<div className="file_uploader-box">
					<FaUpload className="h-4 w-4" />
					<h3 className="base-medium text-light-2 mb-2 mt-6">
						Select product image or Drag photo here
					</h3>
					<p className="text-blue-gray-500">SVG, PNG, JPG</p>
				</div>
			)}
		</div>
	);
};

export default FileUploader;
