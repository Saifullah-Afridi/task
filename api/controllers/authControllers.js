const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const SignUp = async (req, res, next) => {
  console.log("adsfasdfsaa");

  const { fullName, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return next(new AppError("This user already exists", 400));
    }

    const user = new User({ fullName, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
    }

    if (!user || !(await user.isPasswordValid(password))) {
      return next(new AppError("Please provide correct credentials", 400));
    }

    const token = await user.generateJwtToken();

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

module.exports = { SignUp, logIn };
