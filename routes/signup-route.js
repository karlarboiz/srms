const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'images')
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now() +'-'+ file.originalname);
    }
});
const signupControllers = require('../controllers/signup-controllers')

const upload = multer({storage:storage})
const router = express.Router();

router.get('/signup-page',signupControllers.signupPage)

router.post('/signup/save',upload.single('img'),signupControllers.signupEntry)

router.get('/signup-success',(req,res)=>{
    res.render('signup-success');
})

module.exports = router;