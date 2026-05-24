const Overtime = require("../models/Overtime");
const Attendance = require("../models/Attendance");

exports.requestOvertime = async (req, res) => {
  try {
    const { date, requestedHours, reason } = req.body;

    const overtime = new Overtime({
      userId: req.user.id,
      date,
      requestedHours,
      reason,
    });

    await overtime.save();
    res.json(overtime);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getMyOvertime = async (req, res) => {
  try {
    const overtime = await Overtime.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(overtime);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getPendingOvertime = async (req, res) => {
  try {
    const overtime = await Overtime.find({ status: "pending" }).populate(
      "userId",
      "name email",
    );
    res.json(overtime);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.approveOvertime = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const overtime = await Overtime.findById(id);
    if (!overtime) {
      return res.status(404).json({ msg: "Overtime request not found" });
    }

    overtime.status = "approved";
    overtime.approvedBy = req.user.id;
    overtime.remarks = remarks;

    await overtime.save();
    const attendance = await Attendance.findOne({
      userId: overtime.userId,
      date: overtime.date,
    });
    if (attendance) {
      attendance.overtimeApproved = true;
      attendance.overtimeHours = overtime.requestedHours;
      await attendance.save();
    }
    res.json(overtime);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.rejectOvertime = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const overtime = await Overtime.findById(id);
    if (!overtime) {
      return res.status(404).json({ msg: "Overtime request not found" });
    }

    overtime.status = "rejected";
    overtime.approvedBy = req.user.id;
    overtime.remarks = remarks;

    await overtime.save();
    res.json(overtime);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
