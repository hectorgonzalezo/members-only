const { body, validationResult } = require("express-validator");
const aysnc = require("async");


const Message = require("../models/messageModel");

// Show only a particular message
exports.message_detail = (req, res) => {
  req.send("show message")
}

// Show form to create new message
exports.message_create_get = (req, res) => {
  console.log('si')
  res.render('message-create', { title: "Create message" });
}

// Add message to database
exports.message_create_post = (req, res) => {
  req.send("create message POST")
}

// Show confirmation to delete message
exports.message_delete_get = (req, res) => {
  req.send("delete message GET")
}

// Delete message from database
exports.message_delete_post = (req, res) => {
  req.send("delete message POST")
}