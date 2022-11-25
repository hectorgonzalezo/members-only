const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type:String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true},
  password: { type: String, required: true},
  membershipStatus: { type: String, required: true, enum: ["regular", "member", "admin"], default: "regular" },
});

UserSchema.virtual("name").get(function(){
  let fullname = "";
  if (this.firstName && this.lastName) {
    fullname = `${this.familyName}, ${this.firstName}`;
  }
  if (!this.firstName || !this.familyName) {
    fullname = "";
  }
  return fullname;
})

module.exports = mongoose.model("User", UserSchema)