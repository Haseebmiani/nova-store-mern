import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useDeleteUserMutation } from "../../../redux/slices/usersApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const UsersTable = ({ data, refetch }) => {
  const [deleteUser] = useDeleteUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Function to open the modal
  const openModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDeleteId(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId);
      toast.success("User deleted successfully");

      refetch();
    } catch (error) {
      console.error("Error deleting User:", error);
    }
    setIsModalOpen(false);
  };

  return data ? (
    <div className="overflow-x-auto m-4 shadow-md rounded-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-yellow-900 text-white">
            <th className="py-2 px-4 text-left">S.No</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4">{++index}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.role}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-4">
                    {/* <Link to={`/dashboard/users/${item._id}`}>
											<FaEdit className="text-green-500" />
										</Link> */}
                    <button onClick={() => openModal(item._id)}>
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 px-4 text-center">
                No users available!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  ) : null;
};

UsersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default UsersTable;
