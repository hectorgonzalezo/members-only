const express = require('express');

const router = express.Router();

// Sign up page
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up', { title: "Sign up" });
});

// Log in page
router.get('/log-in', (req, res, next) => {
  res.render('log-in', { title: "Log in" });
});

// Add member status page
router.get('/change-member', (req, res, next) => {
  res.render('change-member', { title: "Change member status" });
});

module.exports = router;