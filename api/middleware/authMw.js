const userModel = require("../models/userModel");

const usernameIsAvailable = async (req, res, next) => {
  try {
    let userByUserName = await userModel.filteredUsername({
      username: req.body.username,
    });
    console.log(userByUserName);
    if (userByUserName !== null) {
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

module.exports = { usernameIsAvailable };
