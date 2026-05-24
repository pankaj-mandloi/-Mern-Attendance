const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {
  requestOvertime,
  getMyOvertime,
  getPendingOvertime,
  approveOvertime,
  rejectOvertime
} = require('../controllers/overtimeController');

router.post('/request', auth, requestOvertime);
router.get('/my-requests', auth, getMyOvertime);
router.get('/pending', auth, roleCheck('manager', 'admin'), getPendingOvertime);
router.put('/approve/:id', auth, roleCheck('manager', 'admin'), approveOvertime);
router.put('/reject/:id', auth, roleCheck('manager', 'admin'), rejectOvertime);

module.exports = router;