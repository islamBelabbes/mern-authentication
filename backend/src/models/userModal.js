const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: [String],
  phone: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
