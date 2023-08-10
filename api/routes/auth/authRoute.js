const express = require("express");
const router = express.Router();
const {
  usernameIsAvailable,
  usernameIsExist,
} = require("../../middleware/authMw");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const { generateToken } = require("../../../utils/generateToken");

router.post(
  "/register",
  usernameIsAvailable,

  async (req, res, next) => {
    try {
      let hashedPassword = bcrypt.hashSync(req.body.password, 12);
      let model = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      let newUser = await userModel.createUser(model);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/login", usernameIsExist, async (req, res, next) => {
  try {
    const token = await generateToken(req.user);
    res.status(200).json({
      message: `${req.user.username} geri geldi!`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});
/* router.post("/current", (req, res, next) => {
  res.status(201).json({ message: "Current User" });
}); */

module.exports = router;
