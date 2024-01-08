const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'antonio',
    passwoord: 'Pp12/13/2003',
    database: 'test',
    });
    
    connection.connect((err) => {
        if(err) {
            console.log('Error connecting to Db' + err.stack);
            return;
        }
        console.log('Connection established');

        connection.query('SELECT * FROM users', (err, rows) => {
            if(err) throw err;
        
            console.log('Data received from Db:');
            console.log(rows);
        });
    
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
