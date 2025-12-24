import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HealthDashboard = () => {
  const [vitals, setVitals] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedVital, setSelectedVital] = useState("blood_pressure");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVital, setNewVital] = useState({
    type: "blood_pressure",
    value: "",
    secondaryValue: "",
    unit: "mmHg",
    notes: "",
  });

  const token = localStorage.getItem("token");

  const vitalTypes = [
    { type: "blood_pressure", label: "Blood Pressure", unit: "mmHg", hasSecondary: true },
    { type: "blood_sugar", label: "Blood Sugar", unit: "mg/dL", hasSecondary: false },
    { type: "weight", label: "Weight", unit: "kg", hasSecondary: false },
    { type: "heart_rate", label: "Heart Rate", unit: "bpm", hasSecondary: false },
    { type: "temperature", label: "Temperature", unit: "°F", hasSecondary: false },
    { type: "oxygen_level", label: "Oxygen Level", unit: "%", hasSecondary: false },
  ];

  const fetchLatestVitals = async () => {
    try {
      const res = await fetch(`${BASE_URL}/health-vitals/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setVitals(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch vitals");
    }
  };

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/health-vitals/chart?days=30`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setChartData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch chart data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestVitals();
    fetchChartData();
  }, []);

  const handleAddVital = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/health-vitals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newVital),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Vital recorded successfully");
        setShowAddForm(false);
        setNewVital({
          type: "blood_pressure",
          value: "",
          secondaryValue: "",
          unit: "mmHg",
          notes: "",
        });
        fetchLatestVitals();
        fetchChartData();
      }
    } catch (error) {
      toast.error("Failed to record vital");
    }
  };

  const getVitalConfig = (type) => vitalTypes.find((v) => v.type === type);

  const formatChartData = (type) => {
    if (!chartData[type]) return [];
    return chartData[type].map((item) => ({
      date: new Date(item.date).toLocaleDateString(),
      value: item.value,
      secondaryValue: item.secondaryValue,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-headingColor">Health Dashboard</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
        >
          {showAddForm ? "Cancel" : "+ Add Vital"}
        </button>
      </div>

      {/* Add Vital Form */}
      {showAddForm && (
        <form onSubmit={handleAddVital} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={newVital.type}
                onChange={(e) => {
                  const config = getVitalConfig(e.target.value);
                  setNewVital({
                    ...newVital,
                    type: e.target.value,
                    unit: config?.unit || "",
                    secondaryValue: "",
                  });
                }}
                className="w-full border rounded-md px-3 py-2"
              >
                {vitalTypes.map((v) => (
                  <option key={v.type} value={v.type}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {newVital.type === "blood_pressure" ? "Systolic" : "Value"}
              </label>
              <input
                type="number"
                value={newVital.value}
                onChange={(e) => setNewVital({ ...newVital, value: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            {getVitalConfig(newVital.type)?.hasSecondary && (
              <div>
                <label className="block text-sm font-medium mb-1">Diastolic</label>
                <input
                  type="number"
                  value={newVital.secondaryValue}
                  onChange={(e) => setNewVital({ ...newVital, secondaryValue: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <input
                type="text"
                value={newVital.notes}
                onChange={(e) => setNewVital({ ...newVital, notes: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Optional"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
          >
            Save Vital
          </button>
        </form>
      )}

      {/* Latest Vitals Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {vitalTypes.map((vitalType) => {
          const vital = vitals[vitalType.type];
          return (
            <div
              key={vitalType.type}
              onClick={() => setSelectedVital(vitalType.type)}
              className={`p-4 rounded-lg cursor-pointer transition ${
                selectedVital === vitalType.type
                  ? "bg-primaryColor text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <h4 className="text-sm font-medium">{vitalType.label}</h4>
              {vital ? (
                <div>
                  <p className="text-2xl font-bold mt-1">
                    {vital.value}
                    {vital.secondaryValue && `/${vital.secondaryValue}`}
                  </p>
                  <p className="text-xs mt-1">{vitalType.unit}</p>
                  <p className="text-xs opacity-75">
                    {new Date(vital.recordedAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-sm mt-2 opacity-75">No data</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {getVitalConfig(selectedVital)?.label} Trend (Last 30 Days)
        </h3>
        {loading ? (
          <div className="text-center py-8">Loading chart...</div>
        ) : chartData[selectedVital] && chartData[selectedVital].length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formatChartData(selectedVital)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0067FF"
                name={getVitalConfig(selectedVital)?.hasSecondary ? "Systolic" : "Value"}
              />
              {getVitalConfig(selectedVital)?.hasSecondary && (
                <Line
                  type="monotone"
                  dataKey="secondaryValue"
                  stroke="#FF6384"
                  name="Diastolic"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No data available for this vital. Start tracking to see trends!
          </p>
        )}
      </div>
    </div>
  );
};

export default HealthDashboard;
