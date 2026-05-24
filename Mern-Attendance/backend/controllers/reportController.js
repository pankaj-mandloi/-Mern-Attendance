const Attendance = require('../models/Attendance');

exports.getDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    const queryDate = date || new Date().toISOString().split('T')[0];
    
    let attendance = await Attendance.find({ date: queryDate }).populate('userId', 'name email role');
    
    const report = attendance.map(record => ({
      name: record.userId.name,
      email: record.userId.email,
      punchInTime: record.punchInTime,
      punchOutTime: record.punchOutTime,
      selfie: record.punchInSelfie,
      location: record.punchInLocation,
      workingHours: record.totalHours,
      status: record.totalHours >= 8 ? 'Completed' : 'Incomplete',
      validationStatus: record.status,
      remarks: record.remarks
    }));
    
    res.json({ date: queryDate, totalRecords: report.length, report });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};