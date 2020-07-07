const express = require("express");

const router = express.Router();

const mongoose = require("mongoose"); // We want use Object Id for generating Id

const Order = require("../models/order");

router.get("/", (req, res, next) => {
  Order.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // res.status(200).json({
  //   msg: "GET   orders",
  // });
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    product: req.body.productId,
    qty: req.body.qty,
  });
  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    msg: "Delete Order",
    orderId: req.params.orderId,
  });
});

module.exports = router;
