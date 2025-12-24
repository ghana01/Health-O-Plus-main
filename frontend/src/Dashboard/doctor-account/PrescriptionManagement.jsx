import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";

const PrescriptionManagement = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    diagnosis: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
    notes: "",
    validUntil: "",
  });

  const token = localStorage.getItem("token");

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/prescriptions/doctor`, {
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

  const handleAddMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
      ],
    });
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: newMedicines });
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index][field] = value;
    setFormData({ ...formData, medicines: newMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/prescriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Prescription created successfully");
        setShowForm(false);
        setFormData({
          patientId: "",
          diagnosis: "",
          medicines: [{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
          notes: "",
          validUntil: "",
        });
        fetchPrescriptions();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to create prescription");
    }
  };

  const handleDelete = async (prescriptionId) => {
    if (!window.confirm("Are you sure you want to delete this prescription?")) return;
    
    try {
      const res = await fetch(`${BASE_URL}/prescriptions/${prescriptionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Prescription deleted");
        fetchPrescriptions();
      }
    } catch (error) {
      toast.error("Failed to delete prescription");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-headingColor">Prescription Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
        >
          {showForm ? "Cancel" : "+ New Prescription"}
        </button>
      </div>

      {/* New Prescription Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter Patient ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid Until
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              rows="2"
              required
            />
          </div>

          {/* Medicines */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Medicines</label>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="text-primaryColor hover:underline text-sm"
              >
                + Add Medicine
              </button>
            </div>
            {formData.medicines.map((medicine, index) => (
              <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2 p-3 bg-white rounded border">
                <input
                  type="text"
                  value={medicine.name}
                  onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                  placeholder="Medicine Name"
                  className="border rounded px-2 py-1"
                  required
                />
                <input
                  type="text"
                  value={medicine.dosage}
                  onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                  placeholder="Dosage (e.g., 500mg)"
                  className="border rounded px-2 py-1"
                  required
                />
                <input
                  type="text"
                  value={medicine.frequency}
                  onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                  placeholder="Frequency"
                  className="border rounded px-2 py-1"
                  required
                />
                <input
                  type="text"
                  value={medicine.duration}
                  onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                  placeholder="Duration"
                  className="border rounded px-2 py-1"
                  required
                />
                <input
                  type="text"
                  value={medicine.instructions}
                  onChange={(e) => handleMedicineChange(index, "instructions", e.target.value)}
                  placeholder="Instructions"
                  className="border rounded px-2 py-1"
                />
                {formData.medicines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              rows="2"
              placeholder="Additional notes..."
            />
          </div>

          <button
            type="submit"
            className="bg-primaryColor text-white px-6 py-2 rounded-md hover:bg-primaryColor/90"
          >
            Create Prescription
          </button>
        </form>
      )}

      {/* Prescriptions List */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription._id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">
                    Patient: {prescription.patient?.name || "Unknown"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(prescription._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-gray-700">
                <strong>Diagnosis:</strong> {prescription.diagnosis}
              </p>
              <div className="mt-2">
                <strong>Medicines:</strong>
                <ul className="list-disc list-inside ml-2">
                  {prescription.medicines.map((med, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {med.name} - {med.dosage} ({med.frequency}) for {med.duration}
                    </li>
                  ))}
                </ul>
              </div>
              {prescription.notes && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Notes:</strong> {prescription.notes}
                </p>
              )}
            </div>
          ))}
          {prescriptions.length === 0 && (
            <p className="text-center text-gray-500 py-8">No prescriptions yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PrescriptionManagement;
