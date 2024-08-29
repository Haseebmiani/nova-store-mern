import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import SidebarItem from "./SidebarItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../redux/slices/usersApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ sidebarItems }) => {
  const sidebarWithoutLogout = sidebarItems.slice(0, -1); // Exclude the last item (Logout)
  const logoutItem = sidebarItems.slice(-1)[0]; // Get the last item (Logout)

  const [logoutAPI, { isLoading }] = useLogoutMutation();

  const userInfo = useSelector((state) => state.auth.userInfo); // Get the entire Redux state
  const accessToken = userInfo.accessToken;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div
      className={`fixed top-0 left-0 h-screen w-[18rem] bg-blue-gray-900 text-gray-50 transition-all duration-300 shadow-sm`}>
      <div className="mb-2 p-4 bg-blue-gray-50 w-full flex justify-center items-center">
        <Link to="/">
          <img
            src="/images/brand/nova-logo.png"
            alt="logo"
            width={100}
            height={100}
            className="object-cover"
          />
        </Link>
      </div>
      <List
        className={`flex flex-col p-4 justify-between h-4/5 text-gray-100 overflow-hidden`}>
        <div className="flex flex-col gap-4">
          {sidebarWithoutLogout.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </div>
        {/* Logout Button */}

        <ListItem onClick={logoutHandler}>
          <ListItemPrefix>
            <FaSignOutAlt className="h-5 w-5" />
          </ListItemPrefix>
          {logoutItem.name}
        </ListItem>
      </List>
    </div>
  );
};
export default Sidebar;
