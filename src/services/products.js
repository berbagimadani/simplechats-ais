'Order strict'; 
const Product = require('../models').products;  
var Service = function(){};

Service.all = function(body, cb){
  Product.findAll({
    limit: 5,
    order: [['id', 'DESC']]
  }).then(products => {
    
    const resObj = products.map(product => {
      //tidy up the order data
      return Object.assign(
        {},
        { 
          name: product.name,
          price: product.price
        }
      )
    }) 
    cb(null,resObj)
  }).catch((error) => {  
    cb(error)
  });
}

Service.create = async function(body, cb) {
  try { 
    Product
    .create({
      name: body.name,
      price: body.price
    })
    .then((result) => cb(null, result) )
    .catch((error) => { 
      cb(error);
    });
    
  } catch (e) { 
    cb(e)
  }
}


module.exports = Service