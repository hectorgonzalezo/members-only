const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {type: String, required: true, maxLength: 150},
  timeStamp: {type: Date, default: Date.now()},
  text: {type: String, required: true},
  poster: {type: Schema.Types.ObjectID, ref: "User", required: true},
})

module.exports = mongoose.model("Message", MessageSchema)
