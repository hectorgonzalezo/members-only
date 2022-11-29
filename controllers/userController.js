const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

const User = require("../models/userModel");

// Show only a particular user
exports.user_detail = (req, res) => {
  req.send("show user");
};

// Show form to create new user
exports.user_signup_get = (req, res, next) => {
  fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/')
    .then((response) => response.json())
    .then((data) => {
      res.render("sign-up", { title: "Sign up", emoji: data.emoji });
    })
};
// Add user to database
exports.user_signup_post = [
  body("icon", "User icon is required"),
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
      fetch("https://ranmoji.herokuapp.com/emojis/api/v.1.0/")
            .then((response) => response.json())
            .then((data) => {
              res.render("sign-up", {
                title: "Sign Up",
                user: req.body,
                emoji: data.emoji,
                error: "Username already exists",
              });
            });
      return;
    }
    // If its valid
    // encrypt password
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // look if username already exists
      User.find({ username: req.body.username }).exec((err, user) => {
        if (user.length !== 0) {
          fetch("https://ranmoji.herokuapp.com/emojis/api/v.1.0/")
            .then((response) => response.json())
            .then((data) => {
              res.render("sign-up", {
                title: "Sign Up",
                user: req.body,
                emoji: data.emoji,
                error: "Username already exists",
              });
            });
        } else {
          // Create new user
          const newUser = new User({
            icon: req.body.icon,
            username: req.body.username,
            password: hashedPassword,
            membershipStatus: "regular",
          });

          newUser.save((userErr) => {
            if (userErr) {
              return next(userErr);
            }
            next();
          });
        }
      });
    });
  },
  (req, res, next) => {
    // If the user was saved successfully, redirect to main page
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/sign-up",
      failureFlash: true,
    })(req, res, next);
  },
];

// Show login form
exports.user_login_get = (req, res, next) => {
  res.render("log-in", { title: "Log in" });
};

// Log in
exports.user_login_post = [
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
  },
];

// Log Out
exports.user_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// Show form to make user a member
exports.user_change_member_get = (req, res, next) => {
  res.render("change-member", { title: "Change member status" });
};

// Make user a member
// Test password with the one provided by environment variable.
exports.user_change_member_post = [
  body("password")
    .trim()
    .equals(process.env.MEMBER_PASSWORD)
    .withMessage("Wrong password"),
    (req, res, next) => {
      const errors = validationResult(req);
      // if validation didn't succeed
      if (!errors.isEmpty()) {
        // Re render form with errors
        res.render("change-member", {
          title: "Change member status",
          error: "Incorrect password",
        });
        return;
      }
      const userID = res.locals.currentUser._id;
      const user = { 
        firstName: res.locals.currentUser.firstName,
        lastName: res.locals.currentUser.lastName,
        password: res.locals.currentUser.password,
        membershipStatus: "member",
        _id: userID,
      }

      User.findByIdAndUpdate(userID, user, {}, (userErr, updatedUser) =>{
        if (userErr) {
          return next(userErr)
        }
        res.redirect('/');
      });
    }
]


// Show form to make user admin
exports.user_make_admin_get = (req, res, next) => {
  res.render("make-admin", { title: "Make user administrator" });
};

// Make user administrator
// Test password with the one provided by environment variable.
exports.user_make_admin_post = [
  body("password")
    .trim()
    .equals(process.env.ADMIN_PASSWORD)
    .withMessage("Wrong password"),
    (req, res, next) => {
      const errors = validationResult(req);
      // if validation didn't succeed
      if (!errors.isEmpty()) {
        // Re render form with errors
        res.render("make-admin", {
          title: "Make user administrator",
          error: "Incorrect password",
        });
        return;
      }
      const userID = res.locals.currentUser._id;
      const user = { 
        firstName: res.locals.currentUser.firstName,
        lastName: res.locals.currentUser.lastName,
        password: res.locals.currentUser.password,
        membershipStatus: "admin",
        _id: userID,
      }

      User.findByIdAndUpdate(userID, user, {}, (userErr, updatedUser) =>{
        if (userErr) {
          return next(userErr)
        }
        res.redirect('/');
      });
    }
]
