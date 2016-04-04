'use strict';
module.exports = function(sequelize, DataTypes) {
  var Menus = sequelize.define('Menus', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Menus;
};