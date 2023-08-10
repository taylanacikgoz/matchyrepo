const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
    console.log(userByUserName);
    const isValidLogin = userByUserName && userByUserName.length > 0;
    const PassCheck =
      userByUserName &&
      bcrypt.compareSync(req.body.password, userByUserName.password);
    //console.log(PassCheck);
    if (!isValidLogin && !PassCheck) {
      next({
        status: 401,
        message: "Geçersiz kriter",
      });
    } else {
      req.user = userByUserName;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { usernameIsAvailable, usernameIsExist };
