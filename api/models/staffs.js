'use strict';
module.exports = function(sequelize, DataTypes) {
  var Staffs = sequelize.define('Staffs', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.TEXT,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Staffs;
};