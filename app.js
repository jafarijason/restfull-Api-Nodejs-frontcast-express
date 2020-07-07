const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Controll-Allow-Methods", "*");
    return res.status(200).json();
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    msg: "Not Found",
  });
});

app.listen(3000);
