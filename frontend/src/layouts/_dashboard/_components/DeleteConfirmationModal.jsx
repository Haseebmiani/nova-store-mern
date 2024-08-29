import React from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogHeader>Delete Confirmation</DialogHeader>
			<DialogBody>Are you sure you want to delete this item?</DialogBody>
			<DialogFooter>
				<Button variant="text" color="green" onClick={onClose} className="mr-1">
					<span>Cancel</span>
				</Button>
				<Button variant="gradient" color="red" onClick={onDelete}>
					<span>Delete</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
