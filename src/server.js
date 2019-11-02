const express = require('express'); 
const logger  = require('morgan'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const path = require('path');  

var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var redisClient = require('./config/redis.js'); 
var swagger= require('./config/swagger.js'); 
var getCurrentDate = require('./utils/dates.js'); 

const ApiRoutes = require('./controllers/api'); 
const clientRoutes = require('./controllers/client'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 
// load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

const expressSwagger = require('express-swagger-generator')(app);
 
app.use('/api/', ApiRoutes);
app.use('/', clientRoutes);

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

expressSwagger(swagger);

var chat_messages = [];

io.on('connection', function(socket){
  console.log('a user connected');
  io.sockets.emit("user", 'a user connected');
  
  socket.on("send message", function(sent_msg){
    sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;
    // save into redis
    chat_messages.push({ 
      'message': sent_msg
    }); 
    redisClient.set('chat_app_messages', JSON.stringify(chat_messages)); 
    // end
    io.sockets.emit("update messages", sent_msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });  
});
 
http.listen(port, hostname, () =>
  console.log(`Your port is... ${hostname} ${process.env.PORT}`),
); 

module.exports = app;


