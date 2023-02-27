const { Sequelize, DataTypes } = require("sequelize");
const database = require("../connection/connection");

const user = database.define(
    "tbArea",
    {
        // attributes
        area_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        area: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        zone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        updatedBy : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['area']
            } ,
            {
                unique: false,
                fields: ['zone']
            }
        ]
    }
);

(async () => {
    await user.sync({ force: false });
})();

module.exports = user;