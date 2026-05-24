const Attendance = require('../models/Attendance');

exports.punchIn = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    
    const existing = await Attendance.findOne({ userId: req.user.id, date });
    if (existing) {
      return res.status(400).json({ msg: 'Already punched in today' });
    }
    
    const attendance = new Attendance({
      userId: req.user.id,
      date,
      punchInTime: new Date(),
      punchInSelfie: req.body.selfie,
      punchInLocation: req.body.location
    });
    
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.punchOut = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ userId: req.user.id, date });
    if (!attendance) {
      return res.status(400).json({ msg: 'No punch in found for today' });
    }
    
    if (attendance.punchOutTime) {
      return res.status(400).json({ msg: 'Already punched out today' });
    }
    
    attendance.punchOutTime = new Date();
    attendance.punchOutSelfie = req.body.selfie;
    attendance.punchOutLocation = req.body.location;
    
    const hoursDiff = (attendance.punchOutTime - attendance.punchInTime) / (1000 * 60 * 60);
    attendance.totalHours = parseFloat(hoursDiff.toFixed(2));
    
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ userId: req.user.id }).sort({ date: -1 });
    const attendanceWithStatus = attendance.map(record => ({
      ...record.toObject(),
      workStatus: record.totalHours >= 8 ? 'Completed' : 'Incomplete'
    }));
    res.json(attendanceWithStatus);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTeamAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('userId', 'name email role').sort({ date: -1 });
    const attendanceWithStatus = attendance.map(record => ({
      ...record.toObject(),
      workStatus: record.totalHours >= 8 ? 'Completed' : 'Incomplete'
    }));
    res.json(attendanceWithStatus);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('userId', 'name email role').sort({ date: -1 });
    const attendanceWithStatus = attendance.map(record => ({
      ...record.toObject(),
      workStatus: record.totalHours >= 8 ? 'Completed' : 'Incomplete'
    }));
    res.json(attendanceWithStatus);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate('userId', 'name email');
    if (!attendance) {
      return res.status(404).json({ msg: 'Attendance not found' });
    }
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};