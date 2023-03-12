const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settings-controllers');
const guardRoute = require('../middlewares/auth-protect');

router.use(guardRoute.guardRoute)

router.get('/settings/:id',settingsController.settingsPage)

router.get('/profile/:id/edit',settingsController.profileEditGet)

router.post('/profile/:id/edit',settingsController.profileEditPost)


router.post('/logout',settingsController.logoutFunc)

module.exports = router;