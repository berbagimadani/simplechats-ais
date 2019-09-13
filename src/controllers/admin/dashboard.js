const route = require('express').Router(); 

route.get('/', async (req, res, next) => {
  res.render('dashboard');    
})

module.exports = route
