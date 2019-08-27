'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define('user_tokens', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expired: DataTypes.STRING
  }, {});
  UserToken.associate = function(models) {
    // associations can be defined here
  };
  return UserToken;
};