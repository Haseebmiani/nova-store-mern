import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "./../../../components/user/Profile";

const ProfileScreen = () => {
	const userInfo = useSelector((state) => state.auth.userInfo);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate("/");
		}
	}, [userInfo, navigate]);

	return userInfo && <Profile user={userInfo.user} />;
};

export default ProfileScreen;
