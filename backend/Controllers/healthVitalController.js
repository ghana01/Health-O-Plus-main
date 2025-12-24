import HealthVital from "../models/HealthVitalSchema.js";

// Add a health vital reading
export const addHealthVital = async (req, res) => {
  const userId = req.userId;
  const { type, value, secondaryValue, unit, notes, recordedAt } = req.body;

  try {
    const vital = new HealthVital({
      user: userId,
      type,
      value,
      secondaryValue,
      unit,
      notes,
      recordedAt: recordedAt ? new Date(recordedAt) : new Date(),
    });

    await vital.save();

    res.status(201).json({
      success: true,
      message: "Health vital recorded successfully",
      data: vital,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get health vitals for a user
export const getHealthVitals = async (req, res) => {
  const userId = req.userId;
  const { type, startDate, endDate, limit = 100 } = req.query;

  try {
    const query = { user: userId };

    if (type) {
      query.type = type;
    }

    if (startDate && endDate) {
      query.recordedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const vitals = await HealthVital.find(query)
      .sort({ recordedAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, data: vitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get health vitals chart data (for graphs)
export const getVitalsChartData = async (req, res) => {
  const userId = req.userId;
  const { type, days = 30 } = req.query;

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const query = {
      user: userId,
      recordedAt: { $gte: startDate },
    };

    if (type) {
      query.type = type;
    }

    const vitals = await HealthVital.find(query).sort({ recordedAt: 1 });

    // Group by type for chart data
    const chartData = vitals.reduce((acc, vital) => {
      if (!acc[vital.type]) {
        acc[vital.type] = [];
      }
      acc[vital.type].push({
        date: vital.recordedAt,
        value: parseFloat(vital.value),
        secondaryValue: vital.secondaryValue ? parseFloat(vital.secondaryValue) : null,
        unit: vital.unit,
      });
      return acc;
    }, {});

    res.status(200).json({ success: true, data: chartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get latest vitals summary
export const getLatestVitals = async (req, res) => {
  const userId = req.userId;

  try {
    const vitalTypes = ["blood_pressure", "blood_sugar", "weight", "heart_rate", "temperature", "oxygen_level"];
    const latestVitals = {};

    for (const type of vitalTypes) {
      const latest = await HealthVital.findOne({ user: userId, type })
        .sort({ recordedAt: -1 });
      if (latest) {
        latestVitals[type] = latest;
      }
    }

    res.status(200).json({ success: true, data: latestVitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a health vital
export const deleteHealthVital = async (req, res) => {
  const userId = req.userId;
  const { vitalId } = req.params;

  try {
    const vital = await HealthVital.findOneAndDelete({ _id: vitalId, user: userId });

    if (!vital) {
      return res.status(404).json({ success: false, message: "Vital not found" });
    }

    res.status(200).json({ success: true, message: "Vital deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get health stats/averages
export const getHealthStats = async (req, res) => {
  const userId = req.userId;
  const { days = 30 } = req.query;

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const stats = await HealthVital.aggregate([
      {
        $match: {
          user: userId,
          recordedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$type",
          avgValue: { $avg: { $toDouble: "$value" } },
          minValue: { $min: { $toDouble: "$value" } },
          maxValue: { $max: { $toDouble: "$value" } },
          count: { $sum: 1 },
          latestReading: { $last: "$value" },
          unit: { $first: "$unit" },
        },
      },
    ]);

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
