const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "GET from Products",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    msg: "POST from Products",
  });
});

module.exports = router;
