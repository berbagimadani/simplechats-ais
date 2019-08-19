const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const users = require('../../models').users;   
const schemas = require('../../validations/schemas');
const middleware = require('../../middlewares/middleware');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../../config/passport')(passport);


route.get('/all',  passport.authenticate('jwt', { session: false}), async (req, res) => {
  
  /*try { 
    users.findAll().then(users => { 
      return res.status(HttpStatus.CREATED).json(users); 
    })
  } catch (e) {
    e.status = HttpStatus.BAD_REQUEST;
    return next(e);
  }*/

  console.log(req)
  var token = getToken(req.headers);
  if (token) {
    users.findAll().then(users => { 
      return res.status(HttpStatus.CREATED).json(users); 
    }) 
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized..'});
  }

})


route.post('/login', async (req, res) => {
  users.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(isMatch && !err) {
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
          jwt.verify(token, 'nodeauthsecret', function(err, data){
            console.log(err, data);
          })
          res.json({success: true, token: 'JWT ' + token});
          
          //res.json({success: true});
          
        } else {
          res.status(HttpStatus.UNAUTHORIZED).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      })
    })
    .catch((error) => res.status(400).send(error));
})

route.post('/register',
  middleware(schemas.blogPOST), async (req, res) => {

  try { 
  
    users
    .create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    })
    .then((user) => res.status(HttpStatus.CREATED).json(user) )
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
    
  } catch (e) {
    e.status = HttpStatus.BAD_REQUEST;
    return next(e);
  }
})


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = route
