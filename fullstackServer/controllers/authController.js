const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

// API TO SIGNUP
const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send(error(400, "All fields are required."));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(success(409, "User is already registered."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.send(success(201, "User created successfull."));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

// API TO LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required."));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.send(error(404, "User is not registered."));
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.send(error(403, "Incorrect password."));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(201, { accessToken }));
  } catch (e) {
    return res.send(error(401, e));
  }
};

// API TO CHANGE PASSWORD
const changePasswordController = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.send(error(404, "User is not registered."));
    }

    const matched = await bcrypt.compare(currentPassword, user.password);

    if (!matched) {
      return res.send(error(403, "Incorrect password."));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const userPassword = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    res.send(success(200, userPassword));
  } catch (e) {
    return res.send(error(401, e));
  }
};

// THIS API WILL CHECK THE REFRESH TOKEN VALIDITY AND GENERATE A NEW ACCESS TOKEN
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.send(error(401, "Refresh token in cookie is required."));
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      "lasdknfo3i4u5potifnasdlkfjoir453r"
    );

    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });

    return res.send(success(201, { accessToken }));
  } catch (e) {
    return res.send(error(401, "Invalid refresh token."));
  }
};

// internal functions
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, "eiughjbkjvxosaiu7r9et58yh", {
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log("Errorr: ", error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, "juietr7jfkutrwe9ruifjnf9r", {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log("Errorr: ", error);
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
  changePasswordController,
};


