const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const passport = require('passport');
const middleware = require('../../middlewares/middleware');
//const validateToken = require('../../utils/validateToken.js');
require('../../config/passport')(passport);

const Product = require('../../models').products;   
const Productschema = require('../../validations/products');

route.post('/add',
  middleware(Productschema.POST), async (req, res, next) => {
  try { 
    Product
    .create({
      name: req.body.name,
      price: req.body.price
    })
    .then((product) => res.status(HttpStatus.CREATED).json(product) )
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
    
  } catch (e) {
    e.status = HttpStatus.BAD_REQUEST;
    next(e);
  }
})


module.exports = route
