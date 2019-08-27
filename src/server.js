const express = require('express'); 
const logger  = require('morgan');
const helmet  = require('helmet');
//const cors    = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const path = require('path'); 

const ApiRoutes = require('./api');

var app = express();

// load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

var myAcl = function (req, res, next) {
  var url = req.url;
  var method = req.method;

  var filter ={
    path: url,
    method: method
  };
  var users = [ 
    {
      path: '/auth/login',
      method: 'GET'
    },
    {
      path: '/orders',
      method: 'GET'
    }
  ];

  users= users.filter(function(item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false;
    }
    return true;
  });
  
  console.log(users)

  const routesWithoutToken = ['/auth/login', '/auth/register']; 
  if(routesWithoutToken.includes(url)) {
    next()
  } else { // with tokens

    /*get passport extract*/
    passport.authenticate('jwt', { session : false }, (err, user, info) => {
      if(user==false){
        res.send({ message: 'anautorize' })
      } else {
        if(url=='/orders') {
          next()
        } else {
          res.send({ message: 'Insufficient permissions to access resource' })
        }
      }
    })(req, res, next);
  
  }
}

app.use('/api', myAcl, ApiRoutes);


dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.listen(port, hostname, () =>
  console.log(`Your port is... ${hostname} ${process.env.PORT}`),
); 

module.exports = app;


