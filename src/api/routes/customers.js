const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const passport = require('passport');
const middleware = require('../../middlewares/middleware');
//const validateToken = require('../../utils/validateToken.js');
require('../../config/passport')(passport);

const Customer = require('../../models').customers;   
const CustomerSchema = require('../../validations/customers');

route.get('/all', async function (req, res) {
   
  Customer.findAll({
    limit: 5,
    order: [['id', 'DESC']],
  }).then(customers => {
    const resObj = customers.map(cus => {
      //tidy up the cus data
      return Object.assign(
        {},
        {
          phone: cus.phone,
          name: cus.name
        }
      )
    });
    res.status(HttpStatus.OK).json(resObj)
  });

})

route.post('/add',
  middleware(CustomerSchema.POST), async (req, res) => {
  try { 
    Customer
    .create({
      name: req.body.name,
      phone: req.body.phone
    })
    .then((customer) => res.status(HttpStatus.CREATED).json(customer) )
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
