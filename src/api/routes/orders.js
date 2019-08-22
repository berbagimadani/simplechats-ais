const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const passport = require('passport');
const middleware = require('../../middlewares/middleware');
//const validateToken = require('../../utils/validateToken.js');
require('../../config/passport')(passport);

const Order = require('../../models').orders;   
const Customer = require('../../models').customers;
const OrderSchema = require('../../validations/orders');

route.get('/all', async function (req, res) {
   
  Order.findAll({
    limit: 5,
    order: [['id', 'DESC']],
    include: [
      {
        model: Customer,
      }
    ]
  }).then(orders => {
    const resObj = orders.map(order => {
      //tidy up the order data
      return Object.assign(
        {},
        {
          order: order.id,
          customers: order.customer
        }
      )
    });
    res.status(HttpStatus.OK).json(resObj)
  });

})

route.post('/add',
  middleware(OrderSchema.POST), async (req, res) => {
  //console.log(req.body.customer)
  try { 
    /*
    Order
    .create({ 
      customer_id: req.body.customer
    })
    .then((order) => res.status(HttpStatus.CREATED).json(order) )
    .catch((error) => { 
      res.status(400).send(error);
    });*/

    const owners = [  
      {
        invoice_number: "1",
        customer_id: "2"
      },
      {
        invoice_number: "13",
        customer_id: "3"
      },
    ];

    //const ownerList = req.body.owners;
    Order.bulkCreate(owners)
    .then(newOwners => {
      res.json(newOwners);
    })
    
  } catch (e) {
    e.status = HttpStatus.BAD_REQUEST;
    next(e);
  }
})


module.exports = route
