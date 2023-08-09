const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");

router.get("/", (req, res, next) => {
  const allUsers = userModel.getAllUser();
  res.status(200).json({ message: "all users Here", allUsers });
});
router.get("/:id", (req, res, next) => {
  res.status(201).json({ message: ` User ${req.params.id}` });
});

module.exports = router;
