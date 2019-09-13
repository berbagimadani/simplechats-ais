const route = require('express').Router();
const HttpStatus = require('http-status-codes');    

/**
 * POST Person Area
 * @route POST /person_area
 * @group Person Area 
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.post('/', async (req, res, next) => {
  
})
 

module.exports = route
