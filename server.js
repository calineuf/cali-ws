const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log("Unable to append to log file");
    }
  });

  next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        printTitle: 'Oh No!',
        ohNoMessage: 'The internet is dead!  Run for your lives!'
    });
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home Page',
    welcomeMessage: 'Welcome to the Dollhouse',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'My About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    status: "404",
    message: "you suck"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
