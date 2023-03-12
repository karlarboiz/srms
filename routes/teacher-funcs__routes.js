const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher-controllers')

const guardRoute = require('../middlewares/auth-protect');

router.use(guardRoute.guardRoute)

router.get('/grade-students/:id',teacherController.gradeStudentsPage)

router.post('/submit-grade/:id',teacherController.submitGradePost)

router.get('/submit-grade/:id/edit/:userID',teacherController.submitGradeGet)

router.post('/submit-grade/:id/edit/:userID', teacherController.editSubmitGrade)

module.exports = router;