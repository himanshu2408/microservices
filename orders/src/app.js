const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ordersDB = require("./seed");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.json({ msg: "Hello from the orders microservice" });
});

app.get("/orders", (req, res) => {
	res.json({ ordersDetails: ordersDB });
});

app.get("/orders/:id", (req, res) => {
	var orders = ordersDB.find(order => order.userId == req.params.id).orders;
	res.json({ orders: orders });
});

module.exports = app;