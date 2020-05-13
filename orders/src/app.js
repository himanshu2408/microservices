const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json({ msg: "Hello World from orders" });
});

app.get("/orderdetails/:id", (req, res) => {
	res.json({ orderdetails: req.params });
});

module.exports = app;