const route = require('express').Router();
const glob = require('glob');
/*
* authAcl ( authentication with access control routes )
* authPassport ( only authentication )
*/
const { authAcl, authPassport } = require('@middlewares/acl');

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
  var filename = item.split("/").pop().split('.').slice(0, -1).join('.'); // remove tanda "/" 
  if(file!='index'){ 
    route.use('/'+filename, require('./'+file))
  }
}
// glob it.
glob('*.js', options, forFiles);
//glob('cms/*.js', options, forFiles);

module.exports = route
