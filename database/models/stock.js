const { Sequelize, DataTypes } = require("sequelize");
const database = require("../connection/connection");

const user = database.define(
    "tbStock",
    {
        // attributes
        stockId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        stockName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        qrCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        total_quantity: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 1
        },
        quantity : {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 1
        },
        area_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        //recieved , moved , issued , sold , cutoff
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
                fields: ['stockName']
            },
            {
                unique: true,
                fields: ['qrCode']
            },
            {
                unique: false,
                fields: ['area_id', 'status']
            },
            {
                unique: false,
                fields: ['productId', 'status']
            },
            {
                unique: false,
                fields: ['status']
            },
            {
                unique: false,
                fields: ['updatedAt']
            }
        ]
    }
);

(async () => {
    await user.sync({ force: false });
})();

module.exports = user;