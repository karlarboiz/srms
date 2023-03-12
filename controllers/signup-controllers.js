const bcrypt = require('bcryptjs');
const Signup = require('../models/signup__mvc');
const xss = require('xss');
const signupSession = require('../util/signup-session');

const signupPage = async (req,res)=>{

    
    const inputData = signupSession.signupSessionPage(req);

    const designation = await Signup.fetchDesignationInfo();
    res.render('signup-page',{
        inputData:inputData,
        designation:designation
    })
}

const signupEntry = async(req,res)=>{
    const formBody = req.body;
    const designation = new Signup(null,null,null,null,
        null,null,null,null,null,formBody.designation);
    await designation.fetchDesignationVal()

    const registeredUsers = await Signup.fetchRegisteredUsers();
    const matchedSRegisteredUsers = registeredUsers.find(val=>{
        if(val.name.firstName === formBody.fname &&
            val.name.middleName === formBody.mname &&
            val.name.lastName === formBody.lname &&
            val.designation === designation.position &&
            val.code === formBody.code) return val;
    })

    const hashedPassword = await bcrypt.hash(formBody.pwd,12)
    
    if(!matchedSRegisteredUsers || matchedSRegisteredUsers === undefined) {
        
        signupSession.signupSessionEntry(req,{
            message:"You are not a registered User",
            name: {
                fname:formBody.fname,
                mname:formBody.mname,
                lname:formBody.lname,
            },
            username:formBody.username,
            email:formBody.email,
        },function(){
            res.redirect('/signup-page')
        })
        

        return;
    }

    const storeData = await Signup.fetchStoreData();

    const existedRecord = storeData.find(val=>{
        if(formBody.fname === val.name.firstName &&
            formBody.mname === val.name.middleName &&
            formBody.lname === val.name.lastName &&
            formBody.code === val.code) return val
    })

    if(existedRecord) {

        signupSession.signupSessionEntry(req,{
            message:"Account already existed",
            name: {
                fname:formBody.fname,
                mname:formBody.mname,
                lname:formBody.lname,
            },
            username:formBody.username,
            email:formBody.email,
        },function(){
            res.redirect('/signup-page')
        })

        return;
    }

    req.session.inputData = null;

    const userData = new Signup(xss(formBody.fname),
    xss(formBody.mname),xss(formBody.lname),xss(formBody.username),
    formBody.email,hashedPassword,matchedSRegisteredUsers.designation,
    formBody.code,req.file.path )

    await userData.saveUser();
    res.redirect('/signup-success')
}

module.exports = {
    signupPage:signupPage,
    signupEntry:signupEntry
}