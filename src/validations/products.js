const { checkSchema } = require('express-validator'); 

const schema = { 
  POST: checkSchema({
    name: {
      isLength: {
        errorMessage: 'Name should be at least 3 chars long', 
        options: { min: 3 }
      }
    },
    price:{
      isNumeric: {
        errorMessage: 'Price should be at least 1 numeric long',
      },
      trim:{}, escape: {}
    }, 
  }) 
  // define all the other schemas below 
}; 

module.exports = schema;