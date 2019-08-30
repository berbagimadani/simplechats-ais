const route = require('express').Router();
const HttpStatus = require('http-status-codes'); 
const middleware = require('../../middlewares/middleware');
const CustomerService = require('../../services/customers'); 
const CustomerSchema = require('../../validations/customers');

/*
  @GET Customers 
*/
route.get('/', async function (req, res) {
  await CustomerService.all(req.body, function(err, result) {
    if(err){
      res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
      res.status(HttpStatus.OK).json(result)
    } 
  }) 
})

route.post('/',
  
  middleware(CustomerSchema.POST), 
  
  async (req, res) => {
    await CustomerService.create(req.body, function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.CREATED).json(result)
      } 
    })
  }
);

route.put('/:id',
  
  middleware(CustomerSchema.POST), 
  
  async (req, res) => {
    await CustomerService.put(req.body, parseInt(req.params.id), function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.CREATED).json(result)
      } 
    })
  }
);

/*
route.put('/:id/product/:catid',
  middleware(CustomerSchema.POST), 
  async (req, res) => {

    console.log(req.params)

    await CustomerService.put(req.body, parseInt(req.params.id), function(err, result) {
      if(err){
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.CREATED).json(result)
      } 
    })
  }
);*/


module.exports = route
