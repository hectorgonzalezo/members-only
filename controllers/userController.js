const { body, validationResult } = require("express-validator");
const aysnc = require("async");


const User = require("../models/userModel");

// Show only a particular user
exports.user_detail = (req, res) => {
  req.send("show user")
}

// Show form to create new user
exports.user_signup_get = (req, res, next) => {
  res.render('sign-up', { title: "Sign up" });
}
// Add user to database
exports.user_signup_post = (req, res) => {
  req.send("create user POST")
}

// Show login form
exports.user_login_get = (req, res, next) => {
  res.render("log-in", { title: "Log in" });
};
// Log in
exports.user_login_post = (req, res, next) => {
  req.send("create user POST")
};

// Show form to make user a member
exports.user_change_member_get = (req, res, next) => {
  res.render('change-member', { title: "Change member status" });
}
// Make user a member
exports.user_change_member_post = (req, res, next) => {
  req.send("Change user to member POST")
}
