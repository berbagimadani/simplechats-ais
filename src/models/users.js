'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    email: DataTypes.STRING, 
    password: {
      type: DataTypes.STRING, 
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  },
  /*{ 
  getterMethods: {
    name: function() {
      // a virtual to compute total price from unitPrice and quantity
      return 'xxxxxxxxx'
      }
    }
  },*/
  { 
    hooks: {
      /*beforeValidate: function(user, options) {
        return user.name = 'happy'
      },*/
      afterValidate: function(user, options) {
        var date = new Date();
        var current_hour = date.getMinutes() + date.getSeconds();
        return user.username = current_hour
      }
    }
  },
  {
    underscored: true,
    timestamps: true,
  });

  users.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
    });
  };

  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};