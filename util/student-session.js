function enrollmentSession(req) {
    let enrollmentData = req.session.enrollmentData;
    if(!enrollmentData) {
        enrollmentData = {
            error:false,
            message: ""
        }
    }

    req.session.enrollmentData = null;

    return enrollmentData
}

function enrollmentSessionError(req,data,action) {
    req.session.enrollmentData = {
        error:true,
        data
    }

    req.session.save(action)
}

module.exports = {
    enrollmentSession:enrollmentSession,
    enrollmentSessionError:enrollmentSessionError
}