const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// Sign up page
router.get('/sign-up', userController.user_signup_get);
router.post('/sign-up', userController.user_signup_post);

// Log in page
router.get('/log-in', userController.user_login_get);
router.post('/log-in', userController.user_login_post);

// Log out
router.get('/log-out', userController.user_logout);

// Add member status page
router.get('/change-member', userController.user_change_member_get);
router.post('/change-member', userController.user_change_member_post);

module.exports = router;