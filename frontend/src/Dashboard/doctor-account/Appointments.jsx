import { Link } from "react-router-dom";
import { formateDate } from "../../utils/formatDate.js";

const Appointments = ({ appointments }) => {
  console.log("appointments: ", appointments);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max bg-white border-gray-300 border rounded-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-xs leading-4 uppercase">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Gender</th>
            <th className="py-3 px-6 text-left">Payment</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Booked on</th>
            <th className="py-3 px-6 text-left">Test name</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {appointments?.map((item) => (
            <tr
              key={item._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                    <div className="text-sm font-semibold">
                      {item.user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-left">{item.user.gender}</td>
              <td className="py-3 px-6 text-left">{item.status}</td>
              <td className="py-3 px-6 text-left">{item.ticketPrice}</td>
              <td className="py-3 px-6 text-left">
                {formateDate(item.updatedAt)}
              </td>
              <td className="py-3 px-6 text-left">{item.testName ||'Pneumonia'}</td>
              <td className="py-3 px-6 text-left">
                <Link
                  to={`/video-call/${item.videoCallRoomId}`}
                  className="px-4 py-2 text-white bg-primaryColor rounded-md"
                >
                  Join Call
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
