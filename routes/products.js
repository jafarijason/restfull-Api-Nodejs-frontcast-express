const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "GET from Products",
  });
});

router.post("/", (req, res, next) => {
  const product = {
    title: req.body.title,
    price: req.body.price,
  };
  res.status(200).json({
    msg: "POST from Products",
    createdProduct: product,
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
      msg: "Product not found",
    });
  }
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    msg: "delete Product",
    productId: req.params.productId,
  });
});

module.exports = router;
