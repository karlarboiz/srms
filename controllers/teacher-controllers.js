const Teacher = require('../models/teacher-funcs__mvc');
const teacherSession = require('../util/teacher-session')


const gradeStudentsPage = async (req,res)=>{
   
    const teachers = await Teacher.fetchEnrolledSubjects();
    const gradedSubjects = await Teacher.fetchGradedSubjects();
    const filteredGradedSubjects = gradedSubjects.filter(val => val.teacher === req.params.id)
    const assignedStudents = teachers.filter(val => val.teacher === req.params.id);
    
    const gradeInput = teacherSession.teacherSessionPage(req,assignedStudents.length)
    res.render('grade-students',{
        assignedStudents:assignedStudents,
        gradeInput:gradeInput,
        gradedSubjects:filteredGradedSubjects
    })
}

const submitGradePost = async(req,res)=>{
    const teachers = await Teacher.fetchEnrolledSubjects();
    const assignedStudents = teachers.filter(val => val.teacher === req.params.id);
    const grades =req.body.grade;

    for (let i = 0; i < grades.length; i++) {

        if(grades[i] === '') {

            teacherSession.teacherSessionError(req,{
                message: "One or more subjects did not have grade/grades. Kindly fill it up",
                grades:grades
            },function(){
                res.redirect(`/grade-students/${req.params.id}`)
            })
          
           
            return;
        }
    }
    
    req.session.gradedSubjects =null;
    for (let i = 0; i< assignedStudents.length; i++) {

        delete assignedStudents[i]._id;
        grades[i] = +grades[i];
        assignedStudents[i].grades = grades[i];

        const saveGradedSubjects = new Teacher(assignedStudents[i]);
        await saveGradedSubjects.saveGradedSubjects();

    }

    res.redirect(`/grade-students/${req.params.id}`)
}

const submitGradeGet = async(req,res)=>{
    const grade = new Teacher(null,req.params.id);
    await grade.fetchGrades()
    res.render('grade-edit',{
        grade:grade
    })
}

const editSubmitGrade = async(req,res)=>{
    const updatedGrade = req.body.gradeedit;

    const saveGrade = new Teacher(+updatedGrade,req.params.id)
    await saveGrade.saveGrade();
   
    res.redirect(`/grade-students/${req.params.userID}`)
}

module.exports = {
    gradeStudentsPage:gradeStudentsPage,
    submitGradePost:submitGradePost,
    submitGradeGet:submitGradeGet,
    editSubmitGrade:editSubmitGrade
}