const express = require('express')
const morgan = require('morgan');
const path = require('path')

const app = express()
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');
require("dotenv").config();

const mongoose = require('mongoose');

const usuario = "limachay-user"
const password = "1ibE8vDAgUsOWHA3"
const cluster = "limachay.85rxfwl"
const dbName = "limachayDB"
// Db connection
const uri = `mongodb+srv://${usuario}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("CONECTADO A LA DB"))
    .catch(e => console.log('error de conexión', e))

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Settings 
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, '..', 'ColesRoom-Grupo2-Frontend', 'public')))

app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'files/uploads'),
    filename: (file, cb) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));

// Global variables
app.use((_req, _res, next) => {
    app.locals.format = format;
    next();
});

// Routes
app.use('/', require('./routes/StatusRoute.js'))
app.use('/', require('./routes/SueRoute.js'))
app.use('/', require('./routes/TypeUsersRoute.js'))
app.use('/', require('./routes/UsersRoute.js'))

// Starting the server
app.listen(process.env.PORT || app.get('port'), () => {
    console.log(`CONNECTED`);
    console.log(`PORT: ${app.get('port')}`);
});