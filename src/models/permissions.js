'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    role_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    guard_name: DataTypes.STRING,
    method: DataTypes.STRING
  }, {});
  permissions.associate = function(models) {
    // associations can be defined here
  };
  return permissions;
};