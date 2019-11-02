const route = require('express').Router();
const HttpStatus = require('http-status-codes');
 
route.get('/', async (req, res) => {
  res.render('chats'); 
});
 
module.exports = route;