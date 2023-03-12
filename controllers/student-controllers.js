const Student = require('../models/student-funcs__mvc');
const studentSession = require('../util/student-session');
const enrollmentPage = async(req,res)=>{
    

    const assignedsubjects = await Student.fetchAssignedSubjects();
    const enrolledSubjects = await Student.fetchEnrolledSubjects();
    
    const filteredEnrolledSubjects = enrolledSubjects.filter(val=> val.enrolledUserID === req.params.id);

    const enrollmentData = studentSession.enrollmentSession(req)
    res.render('enrollment',{
        enrollmentData:enrollmentData,
        subjects:assignedsubjects,
        userID:req.params.id,
        enrolledSubjects:filteredEnrolledSubjects
   })
}

const enrollmentSave = async(req,res)=>{
    let array = [];
    const confirmedArray = Array.isArray(req.body.enrollsubject) ?  req.body.enrollsubject: [req.body.enrollsubject];
    const findProfile = new Student(null,req.params.id);
    await findProfile.fetchProfileVal()

    for (let i = 0; i < confirmedArray.length; i++) {
        
        let assignedSubjects = new Student(null,confirmedArray[i]);
        await assignedSubjects.fetchAssignedSubject();
        delete assignedSubjects.id;
        assignedSubjects.enrolledUserID = req.params.id;
        assignedSubjects.enrolledUserIDName = `${findProfile.name.firstName} ${findProfile.name.middleName} ${findProfile.name.lastName}`
        array.push(assignedSubjects);
    }

    let index = 0, newArr = [];
    const length = array.length; 
    function findDuplicates(arr) {
       for (let i = 0; i < length - 1; i++) {
          for (let j = i + 1; j < length; j++) {
          if (arr[i].subjectName === arr[j].subjectName) {
                newArr[index] = arr[i];
                index++;
             }
          }
       }
       return newArr;
    }

    findDuplicates(array);

    const message =() =>{
        if(array[0] === null) {
            return "You have not enrolled any subject"
        }
        else if(newArr.length > 0) {
            return "You have enrolled the same subject twice or more"
        }

        else if (array.length === 1) {
            return "You have enrolled only one subject"
        }
    }

    if(newArr.length > 0 || array[0] === null ||array.length === 1) {
        studentSession.enrollmentSessionError(req,message(),function(){
            res.redirect(`/enrollment/${req.params.id}`)
        })
        
        return
    }

    req.session.enrollmentData = null;

    for (let i = 0; i < array.length; i++) {
        const saveEnrolledSubjects = new Student(array[i],null);
        await saveEnrolledSubjects.saveEnrolledSubjects();
    }

    res.redirect(`/enrollment/${req.params.id}`)
}

const viewGrades = async (req,res)=>{
    const gradedSubjects = await Student.fetchGradedSubjects();
    const filteredGrades = gradedSubjects.filter(val => val.enrolledUserID === req.params.id)
    res.render('view-grades',{
        gradedSubjects:filteredGrades
    })
}

module.exports = {
    enrollmentPage:enrollmentPage,
    enrollmentSave:enrollmentSave,
    viewGrades:viewGrades
}