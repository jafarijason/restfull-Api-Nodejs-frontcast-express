const express = require("express");

const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .then(result=>{
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json(err)
    })
});

router.post("/", (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: `Product created by name: ${req.body.title} and ${req.body.price}`,
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    msg: "delete Product",
    productId: req.params.productId,
  });
});

module.exports = router;
