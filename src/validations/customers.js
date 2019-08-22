const { checkSchema } = require('express-validator'); 

const schema = { 
  POST: checkSchema({
    name: {
      isLength: {
        errorMessage: 'Name should be at least 3 chars long', 
        options: { min: 3 }
      }
    },
    phone:{
      isLength: {
        errorMessage: 'Phone should be at least 3 chars long',
        options: { min: 3 }
      }, 
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