const route = require('express').Router(); 

route.get('/', async (req, res, next) => {
  res.render('login');    
})

module.exports = route
