const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "GET   orders",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    msg: "POST   orders",
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    msg: "Order Detailes",
    orderId: req.params.orderId,
  });
});



router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    msg: "Delete Order",
    orderId: req.params.orderId,
  });
});


module.exports = router;
