import React, { useContext, useState } from "react";

import { authContext } from "./../../context/AuthContext.jsx";

import MyBookings from "./MyBookings.jsx";
import Profile from "./Profile.jsx";
import HealthDashboard from "./HealthDashboard.jsx";
import MedicalRecords from "./MedicalRecords.jsx";
import MedicationReminders from "./MedicationReminders.jsx";
import MyPrescriptions from "./MyPrescriptions.jsx";
import MyAppointments from "./MyAppointments.jsx";
import EmergencyContacts from "./EmergencyContacts.jsx";

import useGetProfile from "../../hooks/useFetchData.jsx";
import { BASE_URL } from "../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("dashboard");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  // console.log(userData, " :userData");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-irisBlueColor text-[16px] font-bold leading-8">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button className="mt-4 w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setTab("dashboard")}
                  className={` ${
                    tab === "dashboard" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Health Dashboard
                </button>
                <button
                  onClick={() => setTab("appointments")}
                  className={` ${
                    tab === "appointments" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Appointments
                </button>
                <button
                  onClick={() => setTab("records")}
                  className={` ${
                    tab === "records" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Medical Records
                </button>
                <button
                  onClick={() => setTab("prescriptions")}
                  className={` ${
                    tab === "prescriptions" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Prescriptions
                </button>
                <button
                  onClick={() => setTab("medications")}
                  className={` ${
                    tab === "medications" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Medications
                </button>
                <button
                  onClick={() => setTab("bookings")}
                  className={` ${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("emergency")}
                  className={` ${
                    tab === "emergency" &&
                    "bg-red-500 text-white font-normal"
                  } py-2 px-4 rounded-md font-semibold text-[14px] leading-7 border border-solid border-red-500 text-red-600`}
                >
                  Emergency
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-4 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Settings
                </button>
              </div>
              {tab === "dashboard" && <HealthDashboard />}
              {tab === "appointments" && <MyAppointments />}
              {tab === "records" && <MedicalRecords />}
              {tab === "prescriptions" && <MyPrescriptions />}
              {tab === "medications" && <MedicationReminders />}
              {tab === "bookings" && <MyBookings />}
              {tab === "emergency" && <EmergencyContacts />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
