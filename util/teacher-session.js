function teacherSessionPage(req,array) {
    let gradeInput = req.session.gradedSubjects;
    if(!gradeInput) {
        gradeInput = {
            error: false,
            message: "",
            grades:new Array(array).fill('')
        };
    }
    req.session.gradedSubjects =null;

    return gradeInput;
}

function teacherSessionError(req,data,action) {
    req.session.gradedSubjects = {
        error:true,
        ...data
    };

    req.session.save(action)
}

module.exports = {
    teacherSessionPage:teacherSessionPage,
    teacherSessionError:teacherSessionError
}