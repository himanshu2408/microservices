const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res ) => {
	res.json({msg: "Hello World new"});
});

app.get("/user/:id", (req, res) => {
	res.json({ req: req.params.id });
});

module.exports = app;