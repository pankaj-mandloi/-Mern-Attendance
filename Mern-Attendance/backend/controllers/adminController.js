const Attendance = require('../models/Attendance');
const User = require('../models/User');

exports.validateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ msg: 'Attendance record not found' });
    }
    
    attendance.status = status;
    attendance.remarks = remarks;
    
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAttendanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const attendance = await Attendance.find({ userId }).populate('userId', 'name email').sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};