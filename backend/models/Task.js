const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = Task;