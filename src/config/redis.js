'strict'; 
const dotenv = require('dotenv'); 

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT_REDIS;

var redis = require('redis'); 

// redis store history chat
const redisClient = redis.createClient({host : hostname, port : port});
redisClient.on('ready',function() {
  //Flush Redis DB
  //redisClient.flushdb(); 
  redisClient.get('chat_app_messages', function (err, reply) {
    if (reply) {
      chat_messages = JSON.parse(reply);
    }
  });
});
redisClient.on('error',function() {
 console.log("Error in Redis");
});

 
module.exports  = redisClient