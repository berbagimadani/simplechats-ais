'Order strict'; 
const Customer = require('../models').customers;  
var CustomerService = function(){};

CustomerService.all = function(body, cb){
  Customer.findAll({
    limit: 50,
    order: [['id', 'DESC']]
  }).then(customers => {
    const resObj = customers.map(customer => {
      //tidy up the order data
      return Object.assign(
        {},
        { 
          id: customer.id,
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

CustomerService.create = async function(body, cb) {
  console.log(body)
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

CustomerService.put = async function(body, id, cb) {
  const updates = body

  try { 
    Customer.findOne({
      where: { id: id }
    })
    .then(customer => {
      return customer.update(updates)
    })
    .then(updatedCustomer => {
      cb(null, updatedCustomer)
    })
    .catch((error) => { 
      cb(error);
    });

    
  } catch (e) { 
    cb(e)
  }
}


module.exports = CustomerService