const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {
  punchIn,
  punchOut,
  getMyAttendance,
  getTeamAttendance,
  getAllAttendance,
  getAttendanceById
} = require('../controllers/attendanceController');

router.post('/punch-in', auth, punchIn);
router.post('/punch-out', auth, punchOut);
router.get('/my-attendance', auth, getMyAttendance);
router.get('/team-attendance', auth, roleCheck('manager', 'admin'), getTeamAttendance);
router.get('/all-attendance', auth, roleCheck('admin'), getAllAttendance);
router.get('/:id', auth, getAttendanceById);

module.exports = router;