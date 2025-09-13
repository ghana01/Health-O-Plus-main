import { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { cities } from "../../assets/data/cities";
import { specialties } from "../../assets/data/specialties";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query.trim());
    }, 700);
    return () => clearTimeout(timeOut);
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(
    `${BASE_URL}/doctors?city=${selectedCity}&name=${name}&specialization=${specialization}`
  );

  return (
    <>
      {/* Header Section */}
      <section className="bg-[#0066ff2c] py-12">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-gray-800">Your home for health</h1>
          <h2 className="text-xl mt-2 text-gray-700">Find and Book</h2>

          {/* Search Section */}
          <div className="flex justify-center items-center gap-4 mt-6">
            {/* City Selection Dropdown */}
            <select
              className="p-3 rounded-md border border-gray-300 text-gray-800 bg-white"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>

            {/* Name Input */}
            <input
              type="search"
              className="py-3 px-4 w-64 rounded-md border border-gray-300 text-gray-800"
              placeholder="Doctor's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Specialization Input */}
            <input
              type="search"
              className="py-3 px-4 w-64 rounded-md border border-gray-300 text-gray-800"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>

          {/* Popular Searches */}
          <div className="mt-3">
            <span className="text-sm text-gray-700">Popular searches:</span>
            {specialties.map((specialty, index) => (
              <a key={index} href="#" className="text-blue-500 ml-3">
                {specialty}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section (Placed Below "Find and Book") */}
      <section className="video-container">
        <div className="container flex items-start justify-between">
          {/* Video Section */}
          <div className="video w-1/2 pr-4">
            <video autoPlay loop controls className="w-full h-auto rounded-md max-h-[450px]">
              <source src="/videos/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text Cards Section */}
          <div className="cards-container w-1/2 pl-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Health-O-Plus Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="card p-6 bg-white shadow-lg rounded-md">
                <h3 className="font-semibold text-xl text-gray-800">Expert Surgeons</h3>
                <p className="text-gray-600 mt-2">Qualified & Experienced Specialists</p>
              </div>

              {/* Card 2 */}
              <div className="card p-6 bg-white shadow-lg rounded-md">
                <h3 className="font-semibold text-xl text-gray-800">Advanced Surgical Procedures</h3>
                <p className="text-gray-600 mt-2">Employing Modern & Cutting-edge Medical Technologies</p>
              </div>

              {/* Card 3 */}
              <div className="card p-6 bg-white shadow-lg rounded-md">
                <h3 className="font-semibold text-xl text-gray-800">Personal Care Assistants</h3>
                <p className="text-gray-600 mt-2">Assistance at every step of your journey Post-Operative Care & Support</p>
              </div>

              {/* Card 4 */}
              <div className="card p-6 bg-white shadow-lg rounded-md">
                <h3 className="font-semibold text-xl text-gray-800">Financial Aid & Assistance</h3>
                <p className="text-gray-600 mt-2">100% transparency in Pricing and No-Cost EMI Options available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Listings Section */}
      <section>
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="container">
            <h2 className="text-center my-6 text-xl font-semibold text-gray-800">
              Available Doctors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors?.length > 0 ? (
                doctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No doctors found for your search criteria
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12">
        <div className="container text-center">
          <h2 className="text-xl font-semibold text-gray-800">What our patients say</h2>
          <p className="text-gray-600">
            World-class care for everyone. Our health system offers unmatched, expert healthcare.
          </p>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
