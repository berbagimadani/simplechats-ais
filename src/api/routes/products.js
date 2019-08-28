const route = require('express').Router();
const HttpStatus = require('http-status-codes');  
const middleware = require('../../middlewares/middleware');
const ProductService = require('../../services/products');   
const Productschema = require('../../validations/products');

/* 
* @GET
*/
route.get('/', async (req, res, next) => {
  await ProductService.all(req.body, function(err, result) {
    if(err){
      res.status(400).send(err);
    } else {
      res.status(HttpStatus.OK).json(result)
    } 
  })
})

/* 
* @POST
*/
route.post('/',
  middleware(Productschema.POST), async (req, res, next) => {
  await ProductService.create(req.body, function(err, result) {
    if(err){
      res.status(400).send(err);
    } else {
      res.status(HttpStatus.OK).json(result)
    } 
  })
})


module.exports = route
