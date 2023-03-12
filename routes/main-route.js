const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('welcome');
})

router.get('/not-found',(req,res) =>{
    res.status(401).render('not-found')
})

module.exports = router;