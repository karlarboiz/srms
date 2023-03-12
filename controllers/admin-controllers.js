const AssignSubjects = require('../models/assign-subjects__mvc');
const CreateSubjects = require('../models/create-subject__mvc');

const adminSession = require('../util/admin-assign__subjects-session')
const assignSubjectsPage = async (req,res)=>{
    
    const storedata= await AssignSubjects.fetchStoreData();
    const subjects = await AssignSubjects.fetchSubjects();

    const filteredTeachers = storedata.filter(val => val.designation === 'Teacher');

    const assignSubject = adminSession.sessionForAssignSubject(req);

    res.render('assign-subjects',{
        teachers:filteredTeachers,
        subjects:subjects,
        assignSubject:assignSubject
    })
}

const assignmentSubjectsEntry = async(req,res)=>{
    let existingData;
    const formBody = req.body;
    
    const teacherPicked = new AssignSubjects(null,null,null,null,formBody.teacher);
    await teacherPicked.fetchTeacherData();

    const subjectPicked = new AssignSubjects(null,null,null,null,formBody.subject);
    await subjectPicked.fetchSubjectData();

    const existingAssignment = new AssignSubjects(null,null,null,null,null,formBody.subject,formBody.teacher);
    await existingAssignment.fetchExistingAssignedSubject();
    if(existingAssignment.teacher) {
        existingData = existingAssignment.teacher === formBody.teacher;
    }

    if(existingData) {
        const message = "There is an existing subject under the same teacher";

        adminSession.errorForAssignSubject(req,message,function(){
            res.redirect('/assign-subjects')
        })
        
        return;
    }
    req.session.assignSubjects = null;

    const assignmentSubjectData = new AssignSubjects(formBody.teacher,
        formBody.subject,teacherPicked.completeName,
        subjectPicked.completeName)

    await assignmentSubjectData.saveSubject();

    res.redirect('/assign-subjects')
}

const createSubjectsPage = async(req,res)=>{

    const createSubject = adminSession.sessionForCreateSubjects(req);
    
    res.render('create-subjects',{
       createSubject:createSubject
    });
}

const createSubjectsEntry = async (req,res)=>{
    let existingData;
    const formBody = req.body;

    const existingSubject = new CreateSubjects(null,null,formBody.subjectname);;
    await existingSubject.fetchExistingCreatedSubject();
    if(existingSubject) {
        existingData = existingSubject.subjectLabel === formBody.subjectlabel
    }
    if(existingData) {

        adminSession.errorForCreateSubject(req,{
            message: "Subject already exist",
            subjectName: formBody.subjectname,
            subjectLabel: formBody.subjectlabel
        },function(){
            res.redirect('/create-subjects');
        })

        return;
    }
    req.session.createSubject = null;
    const createSubject = new CreateSubjects(formBody.subjectname,formBody.subjectlabel);
    await createSubject.createSubject();

    res.redirect('/create-subjects');
}

module.exports = {
    assignSubjectsPage:assignSubjectsPage,
    assignmentSubjectsEntry:assignmentSubjectsEntry,
    createSubjectsPage:createSubjectsPage,
    createSubjectsEntry:createSubjectsEntry
}