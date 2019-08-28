const passport = require('passport');
require('../config/passport')(passport); 

const authAcl = function (req, res, next) {
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
          path: '/api/customers',
          method: 'GET'
        },
        {
          path: '/api/customers',
          method: 'POST'
        },
        {
          path: '/api/products',
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
};

const authPassport = passport.authenticate('jwt', { session : false } );

module.exports = { authAcl, authPassport }