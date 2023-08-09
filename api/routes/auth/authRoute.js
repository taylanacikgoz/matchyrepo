const express = require("express");
const router = express.Router();
const {
  usernameIsAvailable,
  eMailIsAvailable,
} = require("../../middleware/authMw");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

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
router.post("/login", (req, res, next) => {
  res.status(201).json({ message: "User has been logged in" });
});
router.post("/current", (req, res, next) => {
  res.status(201).json({ message: "Current User" });
});

module.exports = router;
