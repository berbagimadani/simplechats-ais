const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
var path = require('path');
//var cookieParser = require('cookie-parser');

const ApiRoutes = require('./api');

var app = express();

// load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', ApiRoutes);

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.listen(port, hostname, () =>
  console.log(`Your port is... ${hostname} ${process.env.PORT}`),
); 

module.exports = app;


