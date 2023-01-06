const express = require('express');
const db = require('./startup/db');
const sesion = require('express-session');
const flash = require('connect-flash');

// startup
const app = express();
db();

// setting templating engine
app.set("view engine", "ejs");

// middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(sesion({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

// routes
app.use('/', require('./routes/index'));
app.use('/add', require('./routes/add'));
app.use('/edit', require('./routes/edit'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running..."));