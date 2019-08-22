const { checkSchema } = require('express-validator'); 

const schema = { 
  POST: checkSchema({
    customer:{
      isLength: {
        errorMessage: 'Customer should be at least 1 chars long',
        options: { min: 1 }
      }, 
    }, 
  }) 
  // define all the other schemas below 
}; 

module.exports = schema;