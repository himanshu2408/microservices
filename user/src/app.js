const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./models/User');
const { DB_URI } = require('./config');
app.use(bodyParser.urlencoded({ extended: false }));


// Connect to MongoDB
mongoose
    .connect(
        DB_URI,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get("/", (req, res) => {
    res.json({ msg: "hello from user microservice" });
});

app.get("/users", (req, res ) => {
    User.find()
        .then(users => res.json({ allUsers: users }))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.get("/user/:id", (req, res) => {
	res.json({ req: req.params.id });
});

app.post('/user', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    newUser.save().then(user => res.json({ addedUser: user }));
});

module.exports = app;