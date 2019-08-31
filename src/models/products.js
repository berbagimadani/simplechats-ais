module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    price: DataTypes.INTEGER,
  });
  return Product;
};
  