const route = require('express').Router();
const glob = require('glob');
const passport = require('passport');
require('../config/passport')(passport); 

var myAcl = function (req, res, next) {
  var url = req.originalUrl;
  var method = req.method;
  passport.authenticate('jwt', { session : false }, (err, user, info) => {
    if(user==false){
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      
      var filter ={
        path: url,
        method: method
      };
      var users = [ 
        {
          path: '/api/orders',
          method: 'GET'
        },
        {
          path: '/api/orders',
          method: 'POST'
        },
        {
          path: '/api/customers/all',
          method: 'GET'
        }
      ];
      users = users.filter(function(item) {
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
      });
      if (users.length > 0) {
        next()
      } else {
        res.send({ message: 'Insufficient permissions to access resource' })
      }
    }
  })(req, res, next);
}

// some options
options = {
  cwd: `${__dirname}/` 
},

// for Files
forFiles = function(err,files){  
  files.forEach((item) => {
    performSomething(item)
  })
};

const performSomething = (item) => {
  var file = item.split('.').slice(0, -1).join('.');
  var filename = item.split("routes/").pop().split('.').slice(0, -1).join('.');
  
  //console.log(file)
  route.use('/'+filename, myAcl, require('./'+file))
}
// glob it.
glob('routes/*.js', options, forFiles);

module.exports = route
