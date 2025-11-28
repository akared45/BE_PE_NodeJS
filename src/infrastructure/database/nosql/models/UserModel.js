const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  profile: {
    fullName: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, default: "OTHER" },
    avatarUrl: { type: String, default: null },
  },
});

module.exports = mongoose.model("User", UserSchema);
