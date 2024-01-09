

    const express = require('express');
    const app = express();
    const port = 3000;
    const mysql = require('mysql2');
    const bodyParser = require('body-parser');

    app.use(express.urlencoded({ extended: true }));

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pp12/13/2003',
        database: 'data',
        });
        
        connection.connect((err) => {
            if (err) {
                console.error('An error occurred while connecting to the DB');
                throw err;
            }
            console.log('Connection established');
        });








    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.render('index.ejs');
    });


    app.get('/login', (req, res) => {
        res.render('login.ejs');
    });
    app.post('/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        
        checkUser(email, password, (err, userExist) => {
            if (err) {
                res.status(500).send('An error occurred while checking the user');
            }
            if (userExist) {
                console.log('User exists');
            } else {
                console.log('no user');
            }
        });
        
    });


    app.get('/register', (req, res) => {
        res.render('register.ejs');
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
    




    function  checkUser(email, password, callback) {
        console.log(`Checking user with email: ${email} and password: ${password}`);
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        
        connection.query(query, [email, password], (err, results) => {
            if (err) {
                return callback(err);
            }
            const userExist = results.length > 0;
            return callback(null, userExist);
        
        });
    }

