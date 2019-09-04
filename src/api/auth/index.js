const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const middleware = require('../../middlewares/middleware');
require('../../config/passport')(passport);

const User = require('../../models').users;   
const UserSchema = require('../../validations/users');
const UserToken = require('../../models').user_tokens;   

function isIdUnique(id) {
  return UserToken.count({ where: { user_id: id } })
    .then(count => {
      if (count != 0) {
        return false;
      }
      return true;
  });
}

/**
 * @typedef AuthEntry
 * @property {string} email.required - Title - eg: Test @gmail.com
 * @property {string} password.required - Description - eg: 
 */
/** 
 * @route POST /auth/login
 * @group Auth
 * @param {string} email.formData.required - eg: admin@gmail.com
 * @param {string} password.formData.required - eg: 
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

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
          var expired = 8600 * 30;
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: expired });
          jwt.verify(token, 'nodeauthsecret', function(err, data){
            //console.log(err, data);
          })

          // insert or update log token user login
          var user_id = user.id; 
          isIdUnique(user_id).then(isUnique => {
            if (isUnique) {
              UserToken.create({user_id: user_id, token: 'JWT ' + token, expired: expired });
            } else {
              UserToken.update({ 
                token: token,
                expired: expired
              }, {
                where: {user_id: user_id}
              }) 
            }
          });

          res.json({success: true, token: 'JWT ' + token});          
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
