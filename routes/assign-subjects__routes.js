const express = require('express');
const router = express.Router();
const assignmentSubjectsController = require('../controllers/admin-controllers');

const guardRoute = require('../middlewares/auth-protect');

router.use(guardRoute.guardRoute)

router.get('/assign-subjects',assignmentSubjectsController.assignSubjectsPage)

router.post('/assign-subjects/save',assignmentSubjectsController.assignmentSubjectsEntry)

module.exports = router;