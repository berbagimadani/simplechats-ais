const getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const validateToken = function(headers, res) {
  var token = getToken(headers);
  if (!token) { 
    return res.status(403).send({success: false, msg: 'Unauthorized..'});
  }
}

module.exports = validateToken
