import React from "react";
// import { useDispatch } from "react-redux";
// import { clearViewedProducts } from "../../redux/slices/recentlyViewedSlice";

const Profile = ({ user }) => {
  // const dispatch = useDispatch();
  // const clearRecentlyViewedProducts = () => {
  // 	dispatch(clearViewedProducts());
  // };

  return (
    <div className="w-3/4 bg-blue-gray-300 mx-auto py-3 px-6 flex flex-col md:flex-row">
      <div>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
        </table>
      </div>
      <div>
        {/* <Button onClick={clearRecentlyViewedProducts}>
					Clear Viewed Products
				</Button> */}
      </div>
    </div>
  );
};

export default Profile;
