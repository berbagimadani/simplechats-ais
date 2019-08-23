module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('order_details', {  
    //name: DataTypes.STRING
  });
  
  return OrderDetail;
};