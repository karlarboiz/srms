const bcrypt = require('bcryptjs');
const Setting = require('../models/settings__mvc');

const settingsPage = async (req,res)=>{

    let storedata;

    try{
        storedata = new Setting(null,null,
            null,null,null,null,null,req.params.id);
    }
    catch(error) {
        alert(error)
        return res.render('not-found') 
    }
 
    await storedata.fetchProfileVal();

    res.render('settings',{
        storedata:storedata
    })
}

const profileEditGet = async (req,res)=>{
    let storedata;

    try{
        storedata = new Setting(null,null,
            null,null,null,null,null,req.params.id);
    }
    catch(error) {
        return res.status(401).render('not-found') 
    }

    await storedata.fetchProfileVal();
    
    res.render('profile-edit',{
        storedata:storedata
    })
}

const profileEditPost = async (req,res)=>{
    const reqBody = req.body;
    const refinedPWD = await bcrypt.hash(reqBody.pwd,12)

    const updateData = new Setting(reqBody.fname,reqBody.mname,
        reqBody.lname,reqBody.email,refinedPWD,
        reqBody.username,reqBody.code,req.params.id);
    await updateData.updateProfileData()
 
    res.redirect(`/settings/${req.params.id}`)
}

const logoutFunc = (req,res)=>{
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/log-in')
}

module.exports = {
    settingsPage:settingsPage,
    profileEditPost:profileEditPost,
    profileEditGet:profileEditGet,logoutFunc:logoutFunc
}