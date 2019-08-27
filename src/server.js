const express = require('express'); 
const logger  = require('morgan');
const helmet  = require('helmet');
//const cors    = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const path = require('path'); 

const ApiRoutes = require('./api');
const AuthRoutes = require('./api/auth');

var app = express();

// load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/api', ApiRoutes);
app.use('/api/auth', AuthRoutes);

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.listen(port, hostname, () =>
  console.log(`Your port is... ${hostname} ${process.env.PORT}`),
); 

module.exports = app;


