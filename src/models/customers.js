module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: { 
        isEven: function(value) {
          return isFieldUnique(value).then(isUnique => {
            if(isUnique==true){
              throw new Error('Name already registered')
            }
          }); 
        }
      }
    },
    phone: DataTypes.STRING,
  });

  function isFieldUnique(value) {
    return Customer.count({ where: { name: value } })
      .then(count => {
        if (count != 0) {
          return true
        }
        return false
    });
  }

  return Customer;
};