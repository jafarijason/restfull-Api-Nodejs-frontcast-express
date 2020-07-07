const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    msg: "Not Found",
  });
});

app.listen(3000);
