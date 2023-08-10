const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const { restricted } = require("../../middleware/authMw");

router.get("/", restricted, async (req, res, next) => {
  const allUsers = await userModel.getAllUser();
  res.status(200).json({ message: "THAT'S ALL I HAVE", allUsers });
});
router.get("/:id", (req, res, next) => {
  res.status(201).json({ message: ` User ${req.params.id}` });
});

module.exports = router;
