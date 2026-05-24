const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getEmployeeDashboard, getManagerDashboard, getAdminDashboard } = require('../controllers/dashboardController');

router.get('/employee', auth, getEmployeeDashboard);
router.get('/manager', auth, roleCheck('manager', 'admin'), getManagerDashboard);
router.get('/admin', auth, roleCheck('admin'), getAdminDashboard);

module.exports = router;