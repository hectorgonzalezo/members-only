const express = require('express');
const Message = require("../models/messageModel");

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // Get all messages and render them
  Message.find()
    .sort({ timeStamp: 1 })
    .populate("poster")
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
    res.render('index', { title: 'Members only', messages });
    })
});

module.exports = router;
