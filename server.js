const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const db = mysql.createConnection({

});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
