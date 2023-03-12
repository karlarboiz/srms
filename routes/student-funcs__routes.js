const express = require('express');
const router = express.Router();
const studentFuncsController = require('../controllers/student-controllers')
const guardRoute = require('../middlewares/auth-protect');

router.use(guardRoute.guardRoute)

router.get('/enrollment/:id', studentFuncsController.enrollmentPage)

router.post('/enrollment/:id/save',studentFuncsController.enrollmentSave)

router.get('/view-grades/:id', studentFuncsController.viewGrades)

module.exports = router;