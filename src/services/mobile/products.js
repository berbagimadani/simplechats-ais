'Order strict'; 
const Product = require('@models').products;  
const filteredBody  = require('@utils/filteredBody');

var ProductService = function(){};

ProductService.all = function(body, cb){
  Product.findAll({
    limit: 50,
    order: [['id', 'DESC']]
  }).then(products => {
    
    const resObj = products.map(product => {
      //tidy up the order data
      return Object.assign(
        {},
        { 
          id: product.id,
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

ProductService.create = async function(body, cb) {
  const { name, price } = (body);
  try { 
    Product
    .create({
      name: name,
      price: price
    })
    .then((result) => cb(null, result) )
    .catch((error) => { 
      cb(error);
    });
    
  } catch (e) { 
    cb(e)
  }
}


module.exports = ProductService