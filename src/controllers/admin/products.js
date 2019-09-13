const route = require('express').Router();
const HttpStatus = require('http-status-codes');  
//const middleware = require('@middlewares/middleware');  
//const Productschema = require('@validations/products');
const Product = require('@models').products;
const filteredBody  = require('@utils/filteredBody');

route.get('/', async (req, res, next) => {

  Product.findAll({
    limit: 50,
    order: [['id', 'DESC']]
  }).then(products => {

    const resObj = products.map(product => {
      //tidy up the order data
      return Object.assign(
        {},
        { 
          id: product.id,
          name: product.name,
          price: product.price
        }
      )
    }) 
    res.render('products/index', {
      result: resObj
    }); 
  }).catch((error) => {  
    res.render('products/index', {
      errors: error
    });
  });
 
})
 

module.exports = route
