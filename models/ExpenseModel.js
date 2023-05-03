const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Expenses = sequelize.define("expenseList", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ExpenseAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ExpenseDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ExpenseCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ExpenseDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ExpenseNotes: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Expenses.getAllExpenses = async () => {
  const expenses = await Expenses.findAll();
  return expenses;
};


module.exports = Expenses;