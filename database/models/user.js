const { Sequelize, DataTypes } = require("sequelize");
const database = require("../connection/connection");

const user = database.define(
    "tbUser",
    {
        // attributes
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_level: {
            type: Sequelize.STRING,
            defaultValue: "guest",
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        lastLogOn: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['username']
            }
        ]
    }
);

(async () => {
    await user.sync({ force: false });
})();

module.exports = user;