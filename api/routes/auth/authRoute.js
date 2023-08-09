const express = require("express");
const router = express.Router();

router.post("/register", (req, res, next) => {
  res.status(201).json({ message: "Register is successfull" });
});
router.post("/login", (req, res, next) => {
  res.status(201).json({ message: "User has been logged in" });
});

module.exports = router;
