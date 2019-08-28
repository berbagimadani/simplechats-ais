const route = require('express').Router();
const HttpStatus = require('http-status-codes'); 
const middleware = require('../../middlewares/middleware'); 
const OrderService = require('../../services/orders'); 
const OrderSchema = require('../../validations/orders');

/*
* @GET Orders
*/
route.get('/', async function (req, res) {
  await OrderService.all(req.body, function(err, result) {
    if(err){
      res.status(400).send(err);
    } else {
      res.status(HttpStatus.OK).json(result)
    } 
  }) 
});

/*
* @POST orders with transactions
*/
route.post('/',
  
  middleware(OrderSchema.POST), 

  async (req, res, next) => {
    await OrderService.create(req.body, function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.CREATED).json(result)
      } 
    })
  }
);

module.exports = route
