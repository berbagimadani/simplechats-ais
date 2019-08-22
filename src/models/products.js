module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  });
  return Product;
};
  