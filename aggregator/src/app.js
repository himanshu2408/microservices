const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const endpoints = require("./config");

app.use(bodyParser.urlencoded({ extended: false }));

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.get("/", (req, res) => {
	res.json({ msg: "Hello from the aggregator microservice" });
});

app.get("/orderdetails/:id", async (req, res) => {
    try {
        const userPromise = fetch(endpoints.user_URI + req.params.id);
        const ordersPromise = fetch(endpoints.orders_URI + req.params.id);
        const promises = [userPromise, ordersPromise];
        const [userResponse, ordersResponse] = await Promise.all(promises);
        const userJson = await userResponse.json();
        const ordersJson = await ordersResponse.json();

        res.json({ userDetails: userJson, orders: ordersJson });
    } catch (e) {
        res.status(500).json(e);
    }
});

app.get("/orders", async (req, res) => {
    try {
        const ordersPromise = fetch(endpoints.orders_URI);
        const promises = [ordersPromise];
        const [ordersResponse] = await Promise.all(promises);
        const ordersJson = await ordersResponse.json();

        res.json({ orders: ordersJson });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = app;