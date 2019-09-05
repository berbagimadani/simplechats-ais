const { checkSchema } = require('express-validator'); 

const schema = { 
  POST: checkSchema({
    name: {
      isLength: {
        errorMessage: 'Name should be at least 3 chars long', 
        options: { min: 3 }
      },
      in: ['body']
    },
    phone:{
      isLength: {
        errorMessage: 'Phone should be at least 3 chars long',
        options: { min: 3 }
      },
      isNumeric: {
        errorMessage: 'Should be at least 1 numeric long',
      },
      in: ['body']
    },
    /*address:{
      isLength: {
        errorMessage: 'Address should be at least 3 chars long', 
        options: { min: 3 }
      }
    }*/
  }) 
  // define all the other schemas below 
}; 

module.exports = schema;