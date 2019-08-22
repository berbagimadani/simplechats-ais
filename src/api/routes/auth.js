const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const middleware = require('../../middlewares/middleware');
require('../../config/passport')(passport);

const User = require('../../models').users;   
const UserSchema = require('../../validations/users');


route.post('/login', async (req, res) => {
  User.findOne({
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
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 8600});
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
  middleware(UserSchema.POST), async (req, res) => {
  try { 
  
    User
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

module.exports = route
