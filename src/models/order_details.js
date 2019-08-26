module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('order_details', {  
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  });
  
  return OrderDetail;
};