const Bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const User = sequelize.define(
  "users",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    refresh_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = Bcrypt.genSaltSync();
        user.password = Bcrypt.hashSync(user.password, salt);
      },
    },
    instanceMethods: {
      validPassword: function (password) {
        return Bcrypt.compareSync(password, this.password);
      },
    },
    //sequelize auto adds createdAt and updatedAt fields
    // to queries unless this option is set to false
    timestamps: false,
  }
);

module.exports = User;
