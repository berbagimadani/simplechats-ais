const route = require('express').Router();

var arrays = {
  'chats': '/', 
};
for (let item in arrays) {
  route.use('/' + arrays[item], require('./' + item));
}


module.exports = route