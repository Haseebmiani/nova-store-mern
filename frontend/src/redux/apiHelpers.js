export const setAuthHeader = (headers) => {
	// Get accessToken from localStorage
	const userInfo = localStorage.getItem("userInfo");
	const user = JSON.parse(userInfo);

	console.log(user?.accessToken);
	// If accessToken exists, set it as a header
	if (user && user?.accessToken) {
		headers.set("Authorization", `Bearer ${userInfo?.accessToken}`);
	}

	return headers || "";
};
