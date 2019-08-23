const route = require('express').Router();
const HttpStatus = require('http-status-codes');
//const passport = require('passport');
const middleware = require('../../middlewares/middleware');
//const validateToken = require('../../utils/validateToken.js');
//require('../../config/passport')(passport);
const Order = require('../../models').orders;
const OrderDetail = require('../../models').order_details;
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
    })
    res.status(HttpStatus.OK).json(resObj)
  }).catch((error) => { 
    res.status(400).send(error);
  });
  

})

route.post('/add',
  middleware(OrderSchema.POST), async (req, res, next) => {
  //console.log(req.body.customer)
  var sequelize = Order.sequelize;
  let transaction;

  try { 
    /*await sequelize.transaction(function(t){
      console.log('transaction openned'+t);
    });*/
    transaction = await sequelize.transaction();
    
    await Order.create({
      customer_id: 1,
      order_details: [
         { name: 'nice property'},
         { name: 'ugly property'}
      ]
      },{
        include: [ OrderDetail ],
        transaction
    }).then((order) => 
      res.status(HttpStatus.CREATED).json(order) 
    );
    

    //await Order.create({ customer_id: 1, },  {transaction})
    //await OrderDetail.create({ name: 'aaa', },  {transaction})

    await transaction.commit();

    /*const products = JSON.parse(req.body.product_ids) 
    const map_products = products.map(Id => {
      return Object.assign( 
        {
          product_id: Id
        }
      )
    });
     /*OrderDetail.bulkCreate(map_products)
      .then(newOwners => {
        res.json(newOwners);
      })*/

    /*
    Order
    .create({ 
      customer_id: req.body.customer
    })
    .then((order) => 


      res.status(HttpStatus.CREATED).json(order) 
    )
    .catch((error) => { 
      res.status(400).send(error);
    });*/ 

  } catch (e) {
    if (e) await transaction.rollback();
    e.status = HttpStatus.BAD_REQUEST;
    next(e);
  }
})

module.exports = route
