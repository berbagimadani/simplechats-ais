const route = require('express').Router();

var arrays = {
  'messages': 'messages', 
};
for (let item in arrays) {
  route.use('/' + arrays[item], require('./' + item));
}


module.exports = route