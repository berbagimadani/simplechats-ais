const passport = require('passport');
require('../config/passport')(passport); 

const authAcl = function (req, res, next) {
  var url = req._parsedUrl.pathname.replace(/\d+/g, ':id');
  var method = req.method;
  //console.log(url);
  
  // POST api/v1/vendor/:id/products
  // PUT api/v1/vendor/:id/products/:id
  // PUT api/v1/vendor/:id/categories/:id
  // PUT api/v1/vendor/:id/products/:id/category/:id
  // DELETE api/v1/vendor/:id/products/:id
  // DELETE api/v1/vendor/:id
  
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
          path: '/orders',
          method: 'GET'
        },
        {
          path: '/orders',
          method: 'POST'
        },
        {
          path: '/customers',
          method: 'GET'
        },
        {
          path: '/customers',
          method: 'POST'
        },
        {
          path: '/customers/:id',
          method: 'PUT'
        },
        {
          path: '/customers/:id/product/:id',
          method: 'PUT'
        },
        {
          path: '/products',
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
        res.status(403).send({ message: 'Insufficient permissions to access resource' })
      }
    }
  })(req, res, next);
};

const authPassport = passport.authenticate('jwt', { session : false } );

module.exports = { authAcl, authPassport }