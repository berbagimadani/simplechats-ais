const route = require('express').Router();
const HttpStatus = require('http-status-codes');
const validateToken = require('../../utils/validateToken'); 
const User = require('../../models').users;    

route.get('/all', async (req, res) => {
  
  /*try { 
    users.findAll().then(users => { 
      return res.status(HttpStatus.CREATED).json(users); 
    })
  } catch (e) {
    e.status = HttpStatus.BAD_REQUEST;
    return next(e);
  }*/
  //validateToken(req.headers, res);

  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
    offset = ((page - 1) * 5) + 1;
  }
  User.findAndCountAll({
    limit: 5,
    offset: offset,
    order: [['id', 'DESC']],
  }).then((users) => { 
      const totalPage = Math.ceil(users.count / 5);
      const pagination = { totalPage: totalPage, currentPage: parseInt(page) };
      return res.status(HttpStatus.CREATED).json({
        users,
        pagination: pagination
      }); 
  });

})

module.exports = route
