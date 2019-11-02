const route = require('express').Router();
const HttpStatus = require('http-status-codes');
var redisClient = require('../../config/redis.js'); 
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3005'); 

/**
 * API for sending a message Just send one parameter string for message After sending should be get response REST
 * @route POST /messages
 * @group Messages
 * @param {string} message.formData
 * @returns {object} 201 - Success
 * @returns {object} 400 - Error
 */
route.post('/', async (req, res) => {
  let message = req.body.message;
  socket.emit('send message', message);
  const results = {
    success: true,
    mesage: message 
  }
  res.status(HttpStatus.CREATED).json(results)
});


/**
 * API for collect message that has been sent out API can get all previously sent message
 * @route GET /messages
 * @group Messages
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */
route.get('/', async (req, res) => {
  var chat_messages = [];
  
  redisClient.get('chat_app_messages', function (err, reply) {
    if (reply) {
      chat_messages = JSON.parse(reply);
    }
    res.status(HttpStatus.OK).json(chat_messages);
  });
  
});


module.exports = route;