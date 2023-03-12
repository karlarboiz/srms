function signupSessionPage(req) {
    let inputData = req.session.inputData;
   
    if(!inputData) {
        inputData = {
            error:false,
            message:"",
            name: {
                fname:'',
                mname:'',
                lname:'',
            },
            username:'',
            email:'',
        }
    }
    
    req.session.inputData = null;

    return inputData
}

function signupSessionEntry(req,data,action) {
    req.session.inputData = {
        error:true,
        ...data
    }

    req.session.save(action)
}

module.exports = {
    signupSessionPage:signupSessionPage,
    signupSessionEntry:signupSessionEntry
}