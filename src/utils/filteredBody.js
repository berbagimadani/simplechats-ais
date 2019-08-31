/**
 * Filtered the request body for be sure
 * nothing wrong can be pass.
 *
 * @export
 * @param {Object} body - Request body
 * @param {Array[String]} whitelist - Element who want to whitelist
 * @returns {Object} body - Request body filtered
 */
const filteredBody = function(body) {
  const items = {};

  Object.keys(body).forEach(key => {

    console.log(key);
    if(key > 0 ){
      items[key] = body[key];
      console.log('aaaaaaaaaaaa');
    } else {
      console.log('sssssss');
      return false;
      //items[key] = body[key];
    }
    //if (whitelist.indexOf(key) >= 0) {
      //items[key] = body[key];
   // }

  });

  return items;
}

module.exports = filteredBody
