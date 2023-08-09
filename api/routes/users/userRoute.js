const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all users Here" });
});
router.get("/:id", (req, res, next) => {
  res.status(201).json({ message: ` User ${req.params.id}` });
});

module.exports = router;
