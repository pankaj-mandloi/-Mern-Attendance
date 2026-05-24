const mongoose = require('mongoose');

const OvertimeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  requestedHours: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Overtime', OvertimeSchema);