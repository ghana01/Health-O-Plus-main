import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { MdWarning, MdDelete } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";

const DeleteDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Function to delete doctor
  const handleDelete = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}/admin/doctors/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Doctor deleted successfully");
        navigate("/admin/doctors");
      })
      .catch((err) => {
        toast.error("Error deleting doctor");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-6 animate-pulse">
            <MdWarning className="text-6xl text-red-600" />
          </div>
        </div>

        {/* Delete Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
              <FaUserDoctor />
              Delete Doctor
            </h1>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Are you sure you want to delete this doctor?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              This action cannot be undone. All doctor data and associated appointments will be permanently removed.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdDelete className="text-xl" />
                {loading ? "Deleting..." : "Yes, Delete Doctor"}
              </button>

              <button
                onClick={() => navigate("/admin/doctors")}
                disabled={loading}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <IoMdArrowBack className="text-xl" />
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Doctor ID: {id?.slice(-8)}
        </p>
      </div>
    </div>
  );
};

export default DeleteDoctor;
