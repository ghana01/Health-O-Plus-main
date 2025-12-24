import MedicationReminder from "../models/MedicationReminderSchema.js";

// Create a medication reminder
export const createMedicationReminder = async (req, res) => {
  const userId = req.userId;
  const { medicineName, dosage, frequency, times, startDate, endDate, notes, prescriptionId } = req.body;

  try {
    const reminder = new MedicationReminder({
      user: userId,
      medicineName,
      dosage,
      frequency,
      times,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      notes,
      prescription: prescriptionId,
    });

    await reminder.save();

    res.status(201).json({
      success: true,
      message: "Medication reminder created successfully",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all medication reminders for a user
export const getMedicationReminders = async (req, res) => {
  const userId = req.userId;
  const { activeOnly } = req.query;

  try {
    const query = { user: userId };
    
    if (activeOnly === "true") {
      query.isActive = true;
      query.$or = [
        { endDate: null },
        { endDate: { $gte: new Date() } },
      ];
    }

    const reminders = await MedicationReminder.find(query)
      .populate("prescription")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reminders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get today's medication schedule
export const getTodaysMedications = async (req, res) => {
  const userId = req.userId;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reminders = await MedicationReminder.find({
      user: userId,
      isActive: true,
      startDate: { $lte: today },
      $or: [
        { endDate: null },
        { endDate: { $gte: today } },
      ],
    }).sort({ times: 1 });

    // Format for today's schedule
    const schedule = reminders.flatMap((reminder) =>
      reminder.times.map((time) => ({
        id: reminder._id,
        medicineName: reminder.medicineName,
        dosage: reminder.dosage,
        time,
        notes: reminder.notes,
      }))
    ).sort((a, b) => a.time.localeCompare(b.time));

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a medication reminder
export const updateMedicationReminder = async (req, res) => {
  const userId = req.userId;
  const { reminderId } = req.params;
  const updates = req.body;

  try {
    const reminder = await MedicationReminder.findOneAndUpdate(
      { _id: reminderId, user: userId },
      updates,
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    res.status(200).json({
      success: true,
      message: "Reminder updated successfully",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle reminder active status
export const toggleReminderStatus = async (req, res) => {
  const userId = req.userId;
  const { reminderId } = req.params;

  try {
    const reminder = await MedicationReminder.findOne({ _id: reminderId, user: userId });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    reminder.isActive = !reminder.isActive;
    await reminder.save();

    res.status(200).json({
      success: true,
      message: `Reminder ${reminder.isActive ? "activated" : "deactivated"}`,
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a medication reminder
export const deleteMedicationReminder = async (req, res) => {
  const userId = req.userId;
  const { reminderId } = req.params;

  try {
    const reminder = await MedicationReminder.findOneAndDelete({
      _id: reminderId,
      user: userId,
    });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    res.status(200).json({ success: true, message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
