import React from "react";
import Loader from "../../../components/Loader";
import { useGetUsersQuery } from "../../../redux/slices/usersApiSlice";
import ErrorMessage from "../../../components/ErrorMessage";
import UsersTable from "../_components/UsersTable";

const Users = () => {
	const {
		data: users,
		isLoading,
		isError,
		error,
		refetch,
	} = useGetUsersQuery({});

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			{error && isError && <ErrorMessage error={error} />}
			<h1 className="text-4xl text-yellow-900 font-bold ml-6">All Users</h1>

			<UsersTable data={users?.doc} refetch={refetch} />
		</div>
	);
};

export default Users;
