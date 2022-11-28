const mongoose = require("mongoose");
const { formatDistanceToNow } = require("date-fns");

const { Schema }= mongoose;

const MessageSchema = new Schema({
  title: {type: String, required: true, maxLength: 150},
  timeStamp: {type: Date, default: Date.now()},
  text: {type: String, required: true},
  poster: {type: Schema.Types.ObjectID, ref: "User", required: true},
})

MessageSchema.virtual("formattedTimeStamp").get(function () {
  return formatDistanceToNow(this.timeStamp, { addSuffix: true});
})

module.exports = mongoose.model("Message", MessageSchema)
