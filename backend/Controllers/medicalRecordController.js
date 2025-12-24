import MedicalRecord from "../models/MedicalRecordSchema.js";
import User from "../models/UserSchema.js";

// Upload a medical record
export const uploadMedicalRecord = async (req, res) => {
  const userId = req.userId;
  const { title, type, description, fileUrl, fileName, doctorId, date } = req.body;

  try {
    const record = new MedicalRecord({
      user: userId,
      title,
      type,
      description,
      fileUrl,
      fileName,
      doctor: doctorId,
      date: date || new Date(),
    });

    await record.save();

    res.status(201).json({
      success: true,
      message: "Medical record uploaded successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all medical records for a user
export const getMedicalRecords = async (req, res) => {
  const userId = req.userId;
  const { type, startDate, endDate } = req.query;

  try {
    const query = { user: userId };

    if (type) {
      query.type = type;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await MedicalRecord.find(query)
      .populate("doctor", "name specialization")
      .sort({ date: -1 });

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single medical record
export const getMedicalRecord = async (req, res) => {
  const { recordId } = req.params;
  const userId = req.userId;

  try {
    const record = await MedicalRecord.findOne({ _id: recordId, user: userId })
      .populate("doctor", "name specialization");

    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a medical record
export const deleteMedicalRecord = async (req, res) => {
  const { recordId } = req.params;
  const userId = req.userId;

  try {
    const record = await MedicalRecord.findOneAndDelete({ _id: recordId, user: userId });

    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.status(200).json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get medical records summary
export const getMedicalRecordsSummary = async (req, res) => {
  const userId = req.userId;

  try {
    const summary = await MedicalRecord.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          latestDate: { $max: "$date" },
        },
      },
    ]);

    const totalRecords = await MedicalRecord.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      data: {
        total: totalRecords,
        byType: summary,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
