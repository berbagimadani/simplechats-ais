const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const passport = require('passport');
//const validateToken = require('../../utils/validateToken.js');
require('../../config/passport')(passport);

route.get('/', async function (req, res) {
  
  res.status(HttpStatus.CREATED).json({}); 

})


module.exports = route
