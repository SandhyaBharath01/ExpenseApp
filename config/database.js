const Sequelize = require('sequelize');
const sequelize = new Sequelize('expensetracker','root','sandhya',{
    dialect : 'mysql',
    host: 'localhost',
});
module.exports = sequelize;

