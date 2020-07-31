var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "movie_planner_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// ROUTES GO HERE

// VIEW ROUTE
// render UI

app.get("/", (req, res) => {
    connection.query('SELECT * FROM movies', (err, data) => {
        console.log(data)
        res.render('index', { movies: data })

    })
})

// API ROUTES
// GET
// POST
app.post('/api/movies', (req, res) => {
    const newMovieText = req.body.newMovieText
    // insert to database
    connection.query('INSERT INTO movies (movie) VALUES (?)', {newMovieText}, (err, response) => {
        if (err) throw err
        res.redirect('/')
    })
    // redirect to home route
})

// PUT
// DELETE
app.delete('/api/movies/:id', (req, res) => {
    
})

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))