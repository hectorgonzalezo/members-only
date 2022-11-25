const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const aysnc = require("async");


const User = require("../models/userModel");

// Show only a particular user
exports.user_detail = (req, res) => {
  req.send("show user")
}

// Show form to create new user
exports.user_signup_get = (req, res, next) => {
  res.render("sign-up", { title: "Sign up" });
}
// Add user to database
exports.user_signup_post = [
  body("firstName")
    .trim()
    .isLength({ min: 3, max: 25 })
    .escape()
    .withMessage("First name must be between 3 and 25 characters long")
    .isAlpha()
    .withMessage("First name can only contain letters"),
  body("lastName")
    .trim()
    .isLength({ min: 3, max: 25 })
    .escape()
    .withMessage("Last name must be between 3 and 25 characters long")
    .isAlpha()
    .withMessage("Last name can only contain letters"),
  body("username")
    .trim()
    .isLength({ min: 3, max: 25 })
    .escape()
    .withMessage("User name must be between 3 and 25 characters long"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("passwordConfirm")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords don't match!"),
  (req, res, next) => {
    const errors = validationResult(req);
    // if validation didn't succeed
    if (!errors.isEmpty()) {
      // Re render form with errors
      res.render("sign-up", {
        title: "Sign Up",
        user: req.body,
        errors: errors.array(),
      });
      return;
    }
    // If its valid
    // encrypt password
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err)
      }

    // Create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      membershipStatus: "regular",
    })

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      next();
    })
    })
  },
  // If the user was saved successfully, redirect to main page
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/sign-up",
    failureFlash: true
  })
]

// Show login form
exports.user_login_get = (req, res, next) => {
  res.render("log-in", { title: "Log in" });
};

// Log in
exports.user_login_post =  [
body("username")
  .trim()
  .isLength({ min: 3, max: 25 })
  .escape()
  .withMessage("User name must be between 3 and 25 characters long"),
body("password")
  .trim()
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    // if validation didn't succeed
    if (!errors.isEmpty()) {
      // Re render form with errors
      res.render("log-in", {
        title: "Log In",
        user: req.body,
        errors: errors.array(),
      });
      return;
    }
    next();
  },
  (req, res, next) => {
    // validate log in
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/log-in",
      failureFlash: true,
    })(req, res, next);
  }
];

// Log Out
exports.user_logout =  (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

// Show form to make user a member
exports.user_change_member_get = (req, res, next) => {
  res.render('change-member', { title: "Change member status" });
}
// Make user a member
exports.user_change_member_post = (req, res, next) => {
  req.send("Change user to member POST")
}
