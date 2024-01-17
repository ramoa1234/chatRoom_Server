const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = 3000;

const intializePassport = require('./passport-config');
intializePassport(
    passport,
    email => users.find(user => user.email === email)
)

const users = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async  (req , res) => {
    try {
        console.log('before push')
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        console.log('after push')
        res.redirect('/login')
    } catch {
        console.log('catch')
        res.redirect('/register')
    }
    console.log(users);
})
app.post('/login' , (req, res) => {
    

})

server.listen(port, () => {
    console.log('server running');
})
io.on('connection', (socket) => {
    console.log("User Connected:" + socket.id);

    socket.on("message", (data) => {
        socket.broadcast.emit("message", data);
    });

})
