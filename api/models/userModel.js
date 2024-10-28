const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    "asdfajsldfjlasdkfjalsdjklf",
    { expiresIn: "9 days" }
  );

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
