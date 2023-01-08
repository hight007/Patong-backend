const Sequelize = require("sequelize");
require('dotenv').config({ path: 'secret.env' });

const host = process.env.SQL_HOST
const database = process.env.SQL_DATABASE
const username = process.env.SQL_USERNAME
const passwords = process.env.SQL_PASSWORDS

const sequelize = new Sequelize(database, username, passwords, {
    host,
    dialect: "postgres",
});

(async () => {
    await sequelize.authenticate();
})();

module.exports = sequelize;