import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { AiOutlineFileText, AiOutlineDownload } from "react-icons/ai";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const token = localStorage.getItem("token");

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/prescriptions/patient`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPrescriptions(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch prescriptions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-headingColor mb-6">My Prescriptions</h2>

      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6" id="prescription-print">
              {/* Prescription Header */}
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primaryColor">Health-O-Plus</h3>
                    <p className="text-sm text-gray-600">Digital Prescription</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {new Date(selectedPrescription.createdAt).toLocaleDateString()}
                    </p>
                    {selectedPrescription.validUntil && (
                      <p className="text-sm text-gray-600">
                        Valid until: {new Date(selectedPrescription.validUntil).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700">Prescribed by</h4>
                <div className="flex items-center gap-3 mt-2">
                  {selectedPrescription.doctor?.photo && (
                    <img
                      src={selectedPrescription.doctor.photo}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">Dr. {selectedPrescription.doctor?.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedPrescription.doctor?.specialization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Diagnosis</h4>
                <p className="p-3 bg-yellow-50 rounded-lg">{selectedPrescription.diagnosis}</p>
              </div>

              {/* Medicines */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Prescribed Medicines</h4>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left border">#</th>
                      <th className="p-2 text-left border">Medicine</th>
                      <th className="p-2 text-left border">Dosage</th>
                      <th className="p-2 text-left border">Frequency</th>
                      <th className="p-2 text-left border">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrescription.medicines.map((med, index) => (
                      <tr key={index}>
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border font-medium">{med.name}</td>
                        <td className="p-2 border">{med.dosage}</td>
                        <td className="p-2 border">{med.frequency}</td>
                        <td className="p-2 border">{med.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Instructions */}
              {selectedPrescription.medicines.some((m) => m.instructions) && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Instructions</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {selectedPrescription.medicines
                      .filter((m) => m.instructions)
                      .map((med, i) => (
                        <li key={i}>
                          <strong>{med.name}:</strong> {med.instructions}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Notes */}
              {selectedPrescription.notes && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Additional Notes</h4>
                  <p className="text-gray-600">{selectedPrescription.notes}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-primaryColor/90 flex items-center gap-2"
              >
                <AiOutlineDownload /> Print/Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prescriptions List */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              onClick={() => setSelectedPrescription(prescription)}
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primaryColor/10 rounded-lg flex items-center justify-center">
                    <AiOutlineFileText className="w-6 h-6 text-primaryColor" />
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Dr. {prescription.doctor?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {prescription.doctor?.specialization}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {prescription.medicines.length} medicines
                  </p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-gray-50 rounded">
                <p className="text-sm">
                  <strong>Diagnosis:</strong> {prescription.diagnosis}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {prescription.medicines.slice(0, 3).map((med, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {med.name}
                  </span>
                ))}
                {prescription.medicines.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{prescription.medicines.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
          {prescriptions.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No prescriptions yet. Your doctor's prescriptions will appear here.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPrescriptions;
