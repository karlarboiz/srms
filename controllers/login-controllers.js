
const Login = require('../models/login__mvc');
const bcrypt = require('bcryptjs');
const loginSession = require('../util/login-session');

const loginMainPage = async (req,res)=>{
    
    const designation = await Login.fetchDesignationInfo();
   const loginData = loginSession.loginSessionPage(req);
    
    res.render('log-in',{
        loginData:loginData,
        designation:designation
    });
}

const loginEnter = async (req,res)=>{
    const formBody = req.body;
   
    const registeredAccounts = await Login.fetchStoreData();
    const designationData = new Login(formBody.designation)
    await designationData.fetchDesignationVal();

    async function compareAccPasswords(value){
        const confirmedAccount = await bcrypt.compare(
            formBody.pwd,
            value
        )
        return confirmedAccount;
    }
    const matchedAccount = registeredAccounts.find(val=>{
        if(val.username === formBody.username &&
            compareAccPasswords(val.password) &&
            val.designation ===  designationData.position&&
            val.code === formBody.code) return val;
    })


    if(!matchedAccount || matchedAccount === undefined) {
        loginSession.errorLogin(req,{
            message:"Incorrect Credentials",
            username:formBody.username,
            code:formBody.code
        },()=>{
            res.redirect('/log-in');
        })
        
        return;
    };
    
  loginSession.validLoginCredentials(req,matchedAccount._id,
    matchedAccount.username,matchedAccount.designation,matchedAccount.code)

    req.session.save(()=>{
        res.redirect('/welcome');
    })
   
}

const loginWelcome = async (req,res)=>{

    if(!req.session.isAuthenticated) {
     
     return res.status(401).render('not-loggedin') 
    }
    const userInfo = new Login(req.session.user.id);
    await userInfo.fetchProfileVal()

    res.render('main',{
        userInfo: userInfo
    });
 }

module.exports = {
    loginMainPage:loginMainPage,
    loginEnter:loginEnter,
loginWelcome:loginWelcome}