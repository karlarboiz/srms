function loginSessionPage(req) {
    let loginData = req.session.user;
    
    if(!loginData) {
        loginData = {
            error:false,
            message:"",
            username:"",
            code:""
        }
    }

    req.session.user = null;

    return loginData;
}

function errorLogin(req,data,action) {
    req.session.user = {
        error:true,
        ...data
    }
    req.session.save(action)
}

function validLoginCredentials(req,id,username,designation,code) {
    req.session.user = {
        id:id,
        username: username,
        designation: designation,
        code: code,

    }

    req.session.isAuthenticated = true;
}

module.exports = {
    loginSessionPage:loginSessionPage,
    errorLogin:errorLogin,
    validLoginCredentials:validLoginCredentials
}