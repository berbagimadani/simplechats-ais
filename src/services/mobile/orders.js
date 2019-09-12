'Order strict'; 
const Order = require('@models').orders; 
const OrderDetail = require('@models').order_details;
const Customer = require('@models').customers;
const Product = require('@models').products;
const orderStock = require('@jobs/orderStock');

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
        attributes: ['id','price', 'name', 'qty'],
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
 
/*
Job Queue
*/
OrderService.test = async function(body, cb){ 
  await orderStock.tes(body, function(err, result) { }) 
}
// end

OrderService.create = async function(body, cb) {
  var sequelize = Order.sequelize;
  let transaction;
  const product_id = body.product_id;
  const qty = body.qty;
  const customer_id = body.customer_id;
  
  try { 

    transaction = await sequelize.transaction();    
 
    const resObj = allProduct.map(el => {
      return (
      { 
          product_id: el.id,
          name: el.name,
          price: el.price,
          qty: qty ? qty : 0
        }
      )
    })  
    /*await Order.create({
      customer_id: customer_id,
      order_details: resObj
      },{
        include: [ OrderDetail ],
        transaction
    }).then((order) => 
      //res.status(HttpStatus.CREATED).json(order) 
      cb(null, order)
    ); */

    await transaction.commit();
    
  } catch (e) {
    if (e) await transaction.rollback();
    //e.status = HttpStatus.BAD_REQUEST;
    cb(e)
  }
}


// multiple product
OrderService.createOrderCheckStock = async function(body, cb) {
  var sequelize = Order.sequelize;
  let transaction;
  const products = JSON.parse(body.product_ids);
  const customer = body.customer;
  try { 

    transaction = await sequelize.transaction();    
  
    const map_products = await Product.findAll({
      attributes: [['id', 'product_id'], 'name','price', 'stock'],
      where: {
        id: products,
      }
    }); 
    
    let outOfStock = {
      bool: false,
      data: []
    }
    
    allProduct = map_products.map(el => {
      if (el.stock < products.find(inner => inner.id === el.id).item) {
        outOfStock.bool = true
        outOfStock.data.push(el)
      }
      return {
        id: el.id,
        stock: el.stock
      }
    })
    /*await Order.create({
      customer_id: customer,
      order_details: map_products
      },{
        include: [ OrderDetail ],
        transaction
    }).then((order) => 
      //res.status(HttpStatus.CREATED).json(order) 
      cb(null, order)
    );*/
    await transaction.commit();
    
  } catch (e) {
    if (e) await transaction.rollback();
    //e.status = HttpStatus.BAD_REQUEST;
    cb(e)
  }
}


module.exports = OrderService