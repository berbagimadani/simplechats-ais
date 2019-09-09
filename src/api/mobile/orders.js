const route = require('express').Router();
const HttpStatus = require('http-status-codes'); 
const middleware = require('@middlewares/middleware'); 
const OrderService = require('@services/mobile/orders'); 
const OrderSchema = require('@validations/mobile/orders');
 
/** 
 * @route GET /orders
 * @group Order  
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
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

 /** 
 * @route POST /orders
 * @group Order 
 * @param {integer} customer_id.formData.reuired - ID from GET api/customers
 * @param {integer} product_id.formData.required - ID from GET api/products
 * @param {integer} qty.formData.required - Qty -eg: 2
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.post('/',
  
  middleware(OrderSchema.POST), 

  async (req, res, next) => {
    //console.log(req);
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
