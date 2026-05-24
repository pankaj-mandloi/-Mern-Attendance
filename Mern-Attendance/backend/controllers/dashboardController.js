const Attendance = require('../models/Attendance');
const Overtime = require('../models/Overtime');
const User = require('../models/User');

exports.getEmployeeDashboard = async (req, res) => {
  try {
    const attendance = await Attendance.find({ userId: req.user.id }).sort({ date: -1 }).limit(10);
    const overtime = await Overtime.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const summary = {
      totalDays: attendance.length,
      completedDays: attendance.filter(a => a.totalHours >= 8).length,
      totalOvertime: overtime.filter(ot => ot.status === 'approved').reduce((sum, ot) => sum + ot.requestedHours, 0)
    };
    res.json({ attendance, overtime, summary });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getManagerDashboard = async (req, res) => {
  try {
    const team = await User.find({ role: 'employee' }).select('-password');
    const pendingOT = await Overtime.find({ status: 'pending' }).populate('userId', 'name email');
    const teamAttendance = await Attendance.find().populate('userId', 'name email').sort({ date: -1 }).limit(20);
    res.json({ team, pendingOT, teamAttendance });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAttendance = await Attendance.countDocuments();
    const pendingOT = await Overtime.countDocuments({ status: 'pending' });
    const recentAttendance = await Attendance.find().populate('userId', 'name email').sort({ date: -1 }).limit(20);
    res.json({ totalUsers, totalAttendance, pendingOT, recentAttendance });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};