'Order strict'; 
const Order = require('@models').orders; 
const OrderDetail = require('@models').order_details;
const Customer = require('@models').customers;
const Product = require('@models').products;

var OrderService = function(){};

OrderService.all = function(body, cb){
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
        /*include: [ {
          model: Product
        }]*/
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
    cb(null,resObj)
  }).catch((error) => {  
    cb(error)
  });
}

OrderService.create = async function(body, cb) {
  var sequelize = Order.sequelize;
  let transaction;
  const products = JSON.parse(body.product_ids);
  const customer = body.customer;
  
  try { 

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
      //res.status(HttpStatus.CREATED).json(order) 
      cb(order)
    );

    await transaction.commit();
    
  } catch (e) {
    if (e) await transaction.rollback();
    //e.status = HttpStatus.BAD_REQUEST;
    cb(e)
  }
}


module.exports = OrderService