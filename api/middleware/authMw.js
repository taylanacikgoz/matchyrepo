const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets/index");

const restricted = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          req.decodeToken = decodedJWT;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "You have to have a token" });
    }
  } catch (error) {
    next(error);
  }
};

const usernameIsAvailable = async (req, res, next) => {
  try {
    let usernameIsAvailable = await userModel.filteredUsername({
      username: req.body.username,
    });
    if (usernameIsAvailable !== null) {
      next({
        status: 422,
        message: "Username has already taken",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const usernameIsExist = async (req, res, next) => {
  try {
    const userByUserName = await userModel.filteredUsername({
      username: req.body.username,
    });
    //console.log(userByUserName);
    const isValidLogin = userByUserName && userByUserName.length > 0;
    const PassCheck =
      userByUserName &&
      bcrypt.compareSync(req.body.password, userByUserName.password);

    if (!isValidLogin && !PassCheck) {
      next({
        status: 401,
        message: "Check your credentials",
      });
    } else {
      req.user = userByUserName;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { restricted, usernameIsAvailable, usernameIsExist };
