const route = require('express').Router();
const HttpStatus = require('http-status-codes');
//const passport = require('passport');
const middleware = require('../../middlewares/middleware');
//const validateToken = require('../../utils/validateToken.js');
//require('../../config/passport')(passport);
const Order = require('../../models').orders;
const OrderDetail = require('../../models').order_details;
const Customer = require('../../models').customers;
const Product = require('../../models').products;
const OrderSchema = require('../../validations/orders');

/*
* Orders
*/
route.get('/', async function (req, res) {
  
  Order.findAll({
    limit: 5,
    order: [['id', 'DESC']],
    include: [
      {
        model: Customer,
        attributes: ['name'],
      }, 
      {
        model: OrderDetail,
        attributes: ['id','price', 'name'],
        include: [ {
          model: Product
        }]
      }
    ]
  }).then(orders => {
    
    const resObj = orders.map(order => {
      //tidy up the order data
      return Object.assign(
        {},
        {
          order: order.id,
          customers: order.customer,
          order_details: order.order_details
        }
      )
    })
    res.status(HttpStatus.OK).json(resObj)
  }).catch((error) => { 
    res.status(400).send(error);
  });
});

/*
* POST orders
*/
route.post('/',
  
  middleware(OrderSchema.POST), 

  async (req, res, next) => {
    var sequelize = Order.sequelize;
    let transaction;
    const products = JSON.parse(req.body.product_ids);
    const customer = req.body.customer;

    try { 
      /*await sequelize.transaction(function(t){
        console.log('transaction openned'+t);
      });*/
    
      transaction = await sequelize.transaction();    
    
      const map_products = await Product.findAll({
        attributes: [['id', 'product_id'], 'name','price'],
        where: {
          id: products,
        }
      }); 
      
      await Order.create({
        customer_id: customer,
        order_details: map_products
        },{
          include: [ OrderDetail ],
          transaction
      }).then((order) => 
        res.status(HttpStatus.CREATED).json(order) 
      );

      await transaction.commit();
      
    } catch (e) {
      if (e) await transaction.rollback();
      e.status = HttpStatus.BAD_REQUEST;
      next(e);
    }
  }
);

module.exports = route
