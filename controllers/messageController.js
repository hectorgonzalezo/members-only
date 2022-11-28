const { body, validationResult } = require("express-validator");


const Message = require("../models/messageModel");

// Show only a particular message
exports.message_detail = (req, res) => {
  req.send("show message")
}

// Show form to create new message
exports.message_create_get = (req, res) => {
  fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/')
    .then((response) => response.json())
    .then((emoji) => {
      console.log(emoji)
      res.render("message-create", { title: "Create new message" })
    })
}

// Add message to database
exports.message_create_post = [
  body("title", "Title is required")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title length must be between 1 and 50 characters"),
  body("message", "Message is required")
    .trim()
    .escape()
    .isLength({ min: 1})
    .withMessage("Message cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    // if validation didn't succeed
    if (!errors.isEmpty()) {
      // Re render form with errors
      res.render("message-create", {
        title: "Create new message",
        message: req.body,
        errors: errors.array(),
      });
      return;
    }

    // create new message
    const newMessage = new Message({
      title: req.body.title,
      text: req.body.message,
      poster: res.locals.currentUser._id,
    });

    // save it in database
    newMessage.save((messageErr) => {
      if(messageErr) {
        return next(messageErr);
      }
      res.redirect('/');
    })
  }
]

// Delete message from database
exports.message_delete = (req, res, next) => {
  // Find message and delete
  Message.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      return next(err);
    }
    res.redirect('/')
  }
  );
}