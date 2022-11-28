const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  icon: {type: String, required: true },
  username: { type: String, required: true},
  password: { type: String, required: true},
  membershipStatus: { type: String, required: true, enum: ["regular", "member", "admin"], default: "regular" },
});

module.exports = mongoose.model("User", UserSchema)