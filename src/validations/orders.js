const { checkSchema } = require('express-validator'); 

const schema = { 
  POST: checkSchema({
    customer:{
      isNumeric: {
        errorMessage: 'Customer should be at least 1 numeric long',
      },
      trim:{}, escape: {},
      in: ['body']
    }, 
    product_ids:{
      custom: {
        options: (value, { req, location, path }) => {
          var array_product = JSON.parse(value);
          var product = Array.isArray(array_product);
          if(product==false){
            throw new Error('Products must is array')
          }
          if(array_product.length < 1 ) {
            throw new Error('Products array must is not empty')
          }
          return value
        }
      },
      in: ['body']
    }, 
  }) 
  // define all the other schemas below 
}; 

module.exports = schema;