const { Sequelize, DataTypes } = require("sequelize");
const database = require("../connection/connection");

const user = database.define(
    "tbStockTracking",
    {
        // attributes
        trackingId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        stockId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        area_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: false,
                fields: ['stockId']
            },
            {
                unique: false,
                fields: ['area_id', 'status']
            },
            {
                unique: false,
                fields: ['status']
            }
        ]
    }
);

(async () => {
    await user.sync({ force: false });
})();

module.exports = user;