function sessionForAssignSubject(req) {
    let assignSubject = req.session.assignSubjects;
    if(!assignSubject) {
        assignSubject = {
            error:false,
            message: ""
        }
    }

    req.session.assignSubjects = null

    return assignSubject;
}

function errorForAssignSubject(req,data,action) {
    req.session.assignSubjects = {
        error:true,
        message:data
    }

    req.session.save(action)
}

function sessionForCreateSubjects(req) {
    let createSubject = req.session.createSubject;
   
    if(!createSubject) {
        createSubject = {
            error:false,
            message: "",
            subjectName: '',
            subjectLabel: ''
        }
    }

    req.session.createSubject = null;

    return createSubject;
}

function errorForCreateSubject(req,data,action) {
    req.session.createSubject = {
        error:true,
        ...data
    }
    req.session.save(action)
}

module.exports = {
    sessionForAssignSubject:sessionForAssignSubject,
    errorForAssignSubject:errorForAssignSubject,
    sessionForCreateSubjects:sessionForCreateSubjects,
    errorForCreateSubject:errorForCreateSubject
}