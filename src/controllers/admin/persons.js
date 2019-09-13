const route = require('express').Router(); 

route.get('/', async (req, res, next) => {
  res.render('persons/index');    
})

module.exports = route
