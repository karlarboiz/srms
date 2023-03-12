const express = require('express');
const router = express.Router();
const createSubjectsController = require('../controllers/admin-controllers');

const guardRoute = require('../middlewares/auth-protect');

router.use(guardRoute.guardRoute)

router.get('/create-subjects',createSubjectsController.createSubjectsPage)

router.post('/create-subjects/save',createSubjectsController.createSubjectsEntry)

module.exports = router;