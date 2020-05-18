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
    res.json({ msg: "hello from the user microservice" });
});

app.get("/user", (req, res ) => {
    User.find()
        .then(users => res.json({ allUsers: users }))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.get("/user/:id", (req, res) => {
    var query = User.where({ _id: req.params.id });
    query.findOne(function (err, user) {
        if (err) res.err(err);
        if (user) {
            res.json({ user: user });
        }
    });
});

//app.get("/user/:id", (req, res) => {
//    var user = userDB.find(user => user._id == req.params.id);
//    res.json(user);
//});

app.post('/user', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    newUser.save().then(user => res.json({ addedUser: user }));
});

module.exports = app;