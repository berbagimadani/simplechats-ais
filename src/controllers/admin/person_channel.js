const route = require('express').Router();
const HttpStatus = require('http-status-codes');     

/**
 * POST Channel Sales
 * @route POST /person_channel
 * @group Channel
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */
route.post('/', async (req, res, next) => {
   
})

module.exports = route
