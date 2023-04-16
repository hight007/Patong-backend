const { Sequelize, DataTypes } = require("sequelize");
const database = require("../connection/connection");

const user = database.define(
    "tbProduct",
    {
        // attributes
        productId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        productType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        spec: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        detail: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        alertQuantity: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        runningSN: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isOrdered: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        default_total_quantity: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 1
        },
        default_cost: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        default_price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        sample_image : {
            type: Sequelize.BLOB,
            allowNull: true,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['productName']
            },
            {
                unique: false,
                fields: ['spec']
            },
            {
                unique: false,
                fields: ['runningSN']
            }
        ]
    }
);

(async () => {
    await user.sync({ force: false });
})();

module.exports = user;