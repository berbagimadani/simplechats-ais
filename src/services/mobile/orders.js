'Order strict'; 
const Order = require('@models').orders; 
const OrderDetail = require('@models').order_details;
const Customer = require('@models').customers;
const Product = require('@models').products;
const orderStock = require('@jobs/orderStock');

var async = require('async');
var Bull = require('bull');
const queue = new Bull('my-first-queue');

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
queue.process(async (field) => {
  var sequelize = Order.sequelize; 
  let transaction;
  var body = field.data.body;
  
  try {

    transaction = await sequelize.transaction(); 

    let done = {
      data: []
    }  
    let outOfStock = {
      bool: false,
      data: []
    }

    let allProductx = await Product.findAll({
      where: {
        id: body.items.map(el => el.id)
      },
      attributes: ['id', 'stock']
    })
    
    allProduct = allProductx.map(el => {
      if (el.stock < body.items.find(inner => inner.id === el.id).qty) {
        outOfStock.bool = true
        outOfStock.data.push(el)

        return {
          id: null,
          stock: el.stock
        }
      } else {
        return {
          id: el.id,
          stock: el.stock
        }
      }
    })

    //validation
    if (body.items.length > allProduct.length) {
      const notFound = req.items.length.filter(el =>
        allProduct.find(inner => inner.id === el.id)
      )
      const error = {
        errorMsg: 'Product not found',
        data: notFound
      } 
      done.data.push(error); 

    }
    if (outOfStock.bool) {
      done.data.push({
        errorMsg: 'Stuff out of Stock',
        data: outOfStock.data.map(el => el.stock).toString()
      });  
      console.log(outOfStock.data.map(el => el.id))
    }
    await Promise.all(
      allProduct.map(el => {
        console.log(el)
        if(el.id!=null){
        return Product.update(
          {
            stock:
            el.stock - body.items.find(inner => inner.id === el.id).qty
          },
          {
            where: {
              id: el.id
            },
            transaction
          }
        )
        }
      })
    ) 
    //done.data.push({isOk:true}); 
    await transaction.commit();

  } catch(e) {
    await transaction.rollback();
    //e.status = HttpStatus.BAD_REQUEST;
    //cb(e)
  }
})
*/

OrderService.test = async function(body, cb){ 
  var sequelize = Order.sequelize;
  const product_id = body.product_id;
  const qty = body.qty;
  let transaction;
  /*
  queue.add({body: body});
  //queue.add({body: body}, {repeat: {cron: '* * * * *'}});
  queue.on('waiting', function(jobId){
    console.log(jobId)
  });
  queue.on('completed', function(job){
    console.log(`Job ${job.id} completed`);
    job.remove();
  })*/

  await orderStock.tes(body, function(err, result) { }) 

}

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