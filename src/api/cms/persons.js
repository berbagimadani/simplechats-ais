const route = require('express').Router();
const HttpStatus = require('http-status-codes');    

/**
 * GET Persons
 * @route GET /persons
 * @group Persons
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.get('/', async (req, res, next) => {
   
})

module.exports = route
