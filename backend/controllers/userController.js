import User from "../models/userModel.js";
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

export const createUser = createOne(User);
export const getUsers = getAll(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
export const updateUser = updateOne(User);
