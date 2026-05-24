const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  punchInTime: { type: Date },
  punchOutTime: { type: Date },
  punchInSelfie: { type: String },
  punchOutSelfie: { type: String },
  punchInLocation: { lat: Number, lng: Number },
  punchOutLocation: { lat: Number, lng: Number },
  totalHours: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'valid', 'invalid'], default: 'pending' },
  remarks: { type: String },
  overtimeApproved: { type: Boolean, default: false },
  overtimeHours: { type: Number, default: 0 }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);