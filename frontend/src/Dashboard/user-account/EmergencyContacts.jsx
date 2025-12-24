import React, { useState, useEffect } from "react";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import { AiOutlinePlus, AiOutlinePhone, AiOutlineDelete } from "react-icons/ai";
import { FaAmbulance, FaHospital, FaFireExtinguisher } from "react-icons/fa";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    isPrimary: false,
  });

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/emergency-contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch emergency contacts");
    }
  };

  const fetchEmergencyServices = async () => {
    try {
      const res = await fetch(`${BASE_URL}/emergency-contacts/emergency-services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEmergencyServices(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch emergency services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchEmergencyServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/emergency-contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Contact added successfully!");
        setFormData({ name: "", relationship: "", phone: "", email: "", isPrimary: false });
        setShowAddForm(false);
        fetchContacts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add contact");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const res = await fetch(`${BASE_URL}/emergency-contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Contact deleted successfully!");
        fetchContacts();
      }
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const handleSetPrimary = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/emergency-contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPrimary: true }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Primary contact updated!");
        fetchContacts();
      }
    } catch (error) {
      toast.error("Failed to update contact");
    }
  };

  const getServiceIcon = (name) => {
    if (name.toLowerCase().includes("ambulance")) return <FaAmbulance className="text-2xl text-red-500" />;
    if (name.toLowerCase().includes("hospital")) return <FaHospital className="text-2xl text-blue-500" />;
    if (name.toLowerCase().includes("fire")) return <FaFireExtinguisher className="text-2xl text-orange-500" />;
    return <AiOutlinePhone className="text-2xl text-green-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Emergency Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-headingColor mb-4 flex items-center gap-2">
          <FaAmbulance className="text-red-500" />
          Emergency Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyServices.map((service, index) => (
            <a
              key={index}
              href={`tel:${service.number}`}
              className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-4 border-l-4 border-red-500"
            >
              {getServiceIcon(service.name)}
              <div>
                <h3 className="font-semibold text-headingColor">{service.name}</h3>
                <p className="text-2xl font-bold text-red-600">{service.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Personal Emergency Contacts */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-headingColor">My Emergency Contacts</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-primaryColor text-white px-4 py-2 rounded-lg hover:bg-primaryDark transition-colors"
          >
            <AiOutlinePlus /> Add Contact
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primaryColor"
                  placeholder="Contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primaryColor"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primaryColor"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primaryColor"
                  placeholder="Email address"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  className="w-4 h-4 text-primaryColor"
                />
                <label htmlFor="isPrimary" className="text-sm text-gray-700">Set as primary contact</label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-primaryColor text-white px-6 py-2 rounded-lg hover:bg-primaryDark transition-colors"
              >
                Save Contact
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No emergency contacts added yet.</p>
            <p className="text-sm text-gray-400">Add your emergency contacts for quick access.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className={`p-4 rounded-lg shadow-md ${
                  contact.isPrimary ? "bg-green-50 border-l-4 border-green-500" : "bg-white border"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-headingColor">{contact.name}</h3>
                      {contact.isPrimary && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">Primary</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{contact.relationship}</p>
                    <a href={`tel:${contact.phone}`} className="text-lg font-medium text-primaryColor flex items-center gap-1 mt-2">
                      <AiOutlinePhone /> {contact.phone}
                    </a>
                    {contact.email && (
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {!contact.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(contact._id)}
                        className="text-xs text-green-600 hover:text-green-800"
                      >
                        Set Primary
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
