module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  return Customer;
};