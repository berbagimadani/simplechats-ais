'Order strict'; 
const Order = require('@models').orders; 
const OrderDetail = require('@models').order_details;
const Customer = require('@models').customers;
const Product = require('@models').products; 

var async = require('async');
var Bull = require('bull');
const queue = new Bull('my-first-queue');

var orderStock = function(){};

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
      const notFound = body.items.length.filter(el =>
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

orderStock.tes = function(body, cb){

  queue.add({body: body});
  //queue.add({body: body}, {repeat: {cron: '* * * * *'}});
  queue.on('waiting', function(jobId){
    console.log(jobId)
  });
  queue.on('completed', function(job){
    console.log(`Job ${job.id} completed`);
    job.remove();
  })

}

module.exports = orderStock