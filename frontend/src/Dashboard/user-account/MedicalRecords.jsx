import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { AiOutlineFileText, AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    type: "lab_report",
    description: "",
    fileUrl: "",
    fileName: "",
  });

  const token = localStorage.getItem("token");

  const recordTypes = [
    { value: "lab_report", label: "Lab Report" },
    { value: "prescription", label: "Prescription" },
    { value: "imaging", label: "Imaging (X-Ray, MRI, etc.)" },
    { value: "vaccination", label: "Vaccination" },
    { value: "other", label: "Other" },
  ];

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const url = filter === "all" 
        ? `${BASE_URL}/medical-records`
        : `${BASE_URL}/medical-records?type=${filter}`;
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRecords(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch records");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, [filter]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For demo purposes, we'll use a simple approach
    // In production, you'd upload to cloud storage
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({
          ...formData,
          fileUrl: data.fileUrl || data.url,
          fileName: file.name,
        });
        toast.success("File uploaded");
      }
    } catch (error) {
      toast.error("Failed to upload file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/medical-records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Record saved successfully");
        setShowUploadForm(false);
        setFormData({
          title: "",
          type: "lab_report",
          description: "",
          fileUrl: "",
          fileName: "",
        });
        fetchRecords();
      }
    } catch (error) {
      toast.error("Failed to save record");
    }
  };

  const handleDelete = async (recordId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    
    try {
      const res = await fetch(`${BASE_URL}/medical-records/${recordId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Record deleted");
        fetchRecords();
      }
    } catch (error) {
      toast.error("Failed to delete record");
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      lab_report: "bg-blue-100 text-blue-800",
      prescription: "bg-green-100 text-green-800",
      imaging: "bg-purple-100 text-purple-800",
      vaccination: "bg-yellow-100 text-yellow-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-headingColor">Medical Records</h2>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
        >
          {showUploadForm ? "Cancel" : "+ Upload Record"}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="e.g., Blood Test Report"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              >
                {recordTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              rows="2"
              placeholder="Brief description of the record..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload File</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full border rounded-md px-3 py-2"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            {formData.fileName && (
              <p className="text-sm text-green-600 mt-1">✓ {formData.fileName}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
            disabled={!formData.fileUrl}
          >
            Save Record
          </button>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${
            filter === "all" ? "bg-primaryColor text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>
        {recordTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFilter(type.value)}
            className={`px-4 py-2 rounded-md ${
              filter === type.value ? "bg-primaryColor text-white" : "bg-gray-100"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Records List */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((record) => (
            <div key={record._id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <AiOutlineFileText className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{record.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(record.type)}`}>
                      {recordTypes.find((t) => t.value === record.type)?.label}
                    </span>
                  </div>
                </div>
              </div>
              {record.description && (
                <p className="text-sm text-gray-600 mt-3">{record.description}</p>
              )}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  {record.fileUrl && (
                    <a
                      href={record.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primaryColor hover:text-primaryColor/80"
                    >
                      <AiOutlineDownload className="w-5 h-5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiOutlineDelete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {records.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-8">
              No records found. Upload your first medical record!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
