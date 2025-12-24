import EmergencyContact from "../models/EmergencyContactSchema.js";

// Add an emergency contact
export const addEmergencyContact = async (req, res) => {
  const userId = req.userId;
  const { name, relationship, phone, email, isPrimary } = req.body;

  try {
    // If this is set as primary, unset any existing primary
    if (isPrimary) {
      await EmergencyContact.updateMany(
        { user: userId, isPrimary: true },
        { isPrimary: false }
      );
    }

    const contact = new EmergencyContact({
      user: userId,
      name,
      relationship,
      phone,
      email,
      isPrimary,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Emergency contact added successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all emergency contacts for a user
export const getEmergencyContacts = async (req, res) => {
  const userId = req.userId;

  try {
    const contacts = await EmergencyContact.find({ user: userId }).sort({ isPrimary: -1 });

    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get primary emergency contact
export const getPrimaryEmergencyContact = async (req, res) => {
  const userId = req.userId;

  try {
    const contact = await EmergencyContact.findOne({ user: userId, isPrimary: true });

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an emergency contact
export const updateEmergencyContact = async (req, res) => {
  const userId = req.userId;
  const { contactId } = req.params;
  const updates = req.body;

  try {
    // If setting as primary, unset others
    if (updates.isPrimary) {
      await EmergencyContact.updateMany(
        { user: userId, isPrimary: true },
        { isPrimary: false }
      );
    }

    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: contactId, user: userId },
      updates,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an emergency contact
export const deleteEmergencyContact = async (req, res) => {
  const userId = req.userId;
  const { contactId } = req.params;

  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: contactId,
      user: userId,
    });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get default emergency services
export const getEmergencyServices = async (req, res) => {
  try {
    // Default emergency services (can be customized per region)
    const emergencyServices = [
      {
        name: "Emergency (Ambulance)",
        number: "102",
        description: "National Emergency Medical Service",
        type: "ambulance",
      },
      {
        name: "Police",
        number: "100",
        description: "Police Emergency",
        type: "police",
      },
      {
        name: "Fire Department",
        number: "101",
        description: "Fire Emergency",
        type: "fire",
      },
      {
        name: "Women Helpline",
        number: "1091",
        description: "Women Emergency Helpline",
        type: "helpline",
      },
      {
        name: "National Emergency Number",
        number: "112",
        description: "Unified Emergency Number",
        type: "emergency",
      },
    ];

    res.status(200).json({ success: true, data: emergencyServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
