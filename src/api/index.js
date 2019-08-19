const route = require('express').Router()
const glob = require('glob')

// some options
options = {
  cwd: `${__dirname}/` 
},

// for Files
forFiles = function(err,files){  
  files.forEach((item) => {
    performSomething(item)
  })
};

const performSomething = (item) => {
  var file = item.split('.').slice(0, -1).join('.');
  var filename = item.split("routes/").pop().split('.').slice(0, -1).join('.');
  console.log(file+' '+filename)
  route.use('/'+filename, require('./'+file))
}
// glob it.
glob('**/*.js', options, forFiles);

module.exports = route






