var express = require('express');
var bodyParser = require('body-parser');

// Express //

var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static directory //
app.use(express.static('public'));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// DB //
var db = require('./models');

// Routes //
// HTML Route
app.get('/', function (req, res) {
    let notEatenBurger = [];
    let eatenBurger = [];
    db.Burger.findAll({})
        .then(function (dbBurger) {
            for (let i = 0; i < dbBurger.length; i++) {
                if (dbBurger[i].devoured === 'F') {
                    notEatenBurger.push(dbBurger[i]);
                } else {
                    eatenBurger.push(dbBurger[i]);
                }
            }

            let burgerObj = { notEatenBurger: notEatenBurger, eatenBurger: eatenBurger }
            res.render("index", burgerObj)
        });
});


// GET route for getting all of the Burgers
app.get('/api/burgers/', function (req, res) {
    db.Burger.findAll({})
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});

// Get rotue for retrieving a single Burger
app.get('/api/burgers/:id', function (req, res) {
    db.Burger.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});

// POST route for saving a new Burger
app.post('/api/burgers', function (req, res) {
    console.log(req.body);
    db.Burger.create({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured,
    })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});

// PUT route for updating Burgers
app.put('/api/burgers/:id', function (req, res) {
    db.Burger.update({
        devoured: "T"
    }, {
            where: {
                id: req.params.id
            }
        })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    });
});
