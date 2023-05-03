const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Connect to the database
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'postgres',
});

// Define the Expense model
const Expense = sequelize.define('Expense', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Sync the model with the database
(async () => {
  await sequelize.sync();
})();

// Get all expenses
router.get('/expense', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.send(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving expenses');
  }
});

// Get a single expense by ID
router.get('/expense/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.send(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving expense');
  }
});

// Add a new expense
router.post('/expense', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.send(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding expense');
  }
});

// Update an existing expense by ID
router.put('/expense/:id', async (req, res) => {
  try {
    const [numAffectedRows, affectedRows] = await Expense.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numAffectedRows !== 1) {
      return res.status(404).send('Expense not found');
    }
    res.send(affectedRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating expense');
  }
});

// Delete an existing expense by ID
router.delete('/expense/:id', async (req, res) => {
  try {
    const numAffectedRows = await Expense.destroy({
      where: { id: req.params.id },
    });
    if (numAffectedRows !== 1) {
      return res.status(404).send('Expense not found');
    }
    res.send('Expense deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting expense');
  }
});

module.exports = router;
