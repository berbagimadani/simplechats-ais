const { body } = require('express-validator')

'use strict';
exports.userRegister = () => {

  return [ 
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
  ]

};
