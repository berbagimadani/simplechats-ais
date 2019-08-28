'Order strict'; 
const Customer = require('../models').customers;  
var Service = function(){};

Service.all = function(body, cb){
  Customer.findAll({
    limit: 5,
    order: [['id', 'DESC']]
  }).then(customers => {
    
    const resObj = customers.map(customer => {
      //tidy up the order data
      return Object.assign(
        {},
        { 
          name: customer.name,
          phone: customer.phone
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
    Customer
    .create({
      name: body.name,
      phone: body.phone
    })
    .then((customer) => cb(null, customer) )
    .catch((error) => { 
      cb(error);
    });
    
  } catch (e) { 
    cb(e)
  }
}


module.exports = Service