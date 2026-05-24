const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {
  validateAttendance,
  getAllUsers,
  getAttendanceByUser
} = require('../controllers/adminController');

router.put('/validate-attendance/:id', auth, roleCheck('admin', 'manager'), validateAttendance);
router.get('/users', auth, roleCheck('admin'), getAllUsers);
router.get('/user-attendance/:userId', auth, roleCheck('admin'), getAttendanceByUser);

module.exports = router;