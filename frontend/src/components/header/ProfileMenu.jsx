import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Avatar from "./Avatar";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";

const ProfileMenu = ({ user }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutAPI, { isLoading }] = useLogoutMutation();

	const userInfo = useSelector((state) => state.auth.userInfo); // Get the entire Redux state
	const accessToken = userInfo.accessToken;

	const isAdmin = user && user.role === "admin";

	const logoutHandler = async () => {
		try {
			await logoutAPI(accessToken);
			dispatch(logout());

			if (!isLoading && !userInfo) {
				navigate("/auth/sign-in");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Menu>
			<Typography>👋 Hello, {user.name}</Typography>
			<MenuHandler>
				{/* <Avatar
					variant="circular"
					alt="tania andrew"
					className="cursor-pointer"
					src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
				/> */}

				<div className="cursor-pointer">
					<Avatar username={user.name} />
				</div>
			</MenuHandler>
			<MenuList>
				<MenuItem>
					<Link to="/profile" className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<Typography variant="small" className="font-normal">
							My Profile
						</Typography>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link to="/profile/edit" className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<Typography variant="small" className="font-normal">
							Edit Profile
						</Typography>
					</Link>
				</MenuItem>

				{isAdmin && (
					<MenuItem>
						<Link to="/dashboard" className="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								strokeWidth={2}
								stroke="currentColor"
								viewBox="0 0 24 24"
								className="h-4 w-4"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g>
								<g id="SVGRepo_iconCarrier">
									<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
								</g>
							</svg>
							<Typography variant="small" className="font-normal">
								Dashboard
							</Typography>
						</Link>
					</MenuItem>
				)}

				<hr className="my-2 border-blue-gray-50" />
				<MenuItem className="flex items-center gap-2" onClick={logoutHandler}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-4 w-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
						/>
					</svg>
					<Typography variant="small" className="font-normal">
						Sign Out
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ProfileMenu;
