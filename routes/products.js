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

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "book") {
    res.status(200).json({
      msg: "book",
    });
  } else {
    res.status(400).json({
      msg:"Product not found"
    })
  }
});

module.exports = router;
