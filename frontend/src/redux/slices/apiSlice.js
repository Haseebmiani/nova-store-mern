import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const userInfo = localStorage.getItem("userInfo");
		const user = JSON.parse(userInfo);

		if (user) {
			headers.set("Authorization", `Bearer ${user?.accessToken}`);
		}

		return headers;
	},
});

export const apiSlice = createApi({
	baseQuery,
	credentials: "include",
	tagTypes: ["Product", "Order", "User"],
	endpoints: (builder) => ({}),
});
