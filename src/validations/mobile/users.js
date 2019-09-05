const { checkSchema } = require('express-validator');
const users = require('@models').users;  

const UserSchema = { 
  POST: checkSchema({
    password: {
      isLength: {
        errorMessage: 'Password should be at least 7 chars long', 
        options: { min: 7 }
      },
      in: ['body']
    },
    email:{
      isEmail: {
        errorMessage: 'Format email in valid bro...',
      },
      custom: {
        options: (value, { req, location, path }) => {
          return isEmailUnique(value).then(isUnique => {
            if(isUnique==true){
              throw new Error('Email already registered')
            }
          });
          //return value + req.body.foo + location + path;
        }
      },
      in: ['body']
    }
  }) 
  // define all the other schemas below 
}; 

function isEmailUnique(email) {
  return users.count({ where: { email: email } })
    .then(count => {
      if (count != 0) {
        return true
      }
      return false
  });
}

module.exports = UserSchema;