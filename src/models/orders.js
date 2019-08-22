module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('orders', {
    invoice_number: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    customerId: {
      type: DataTypes.INTEGER,
      field: 'customer_id',
    },
  },
  { 
    hooks: {
      afterValidate: function(order, options) {
        var rand = 1 + Math.floor(Math.random() * 999999999);
        return order.invoice_number = rand;
      }
    }
  });

  Order.associate = models => {
    Order.belongsTo(models.customers);
    //Order.belongsTo(models.products);
  };

  return Order;
};