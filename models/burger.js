module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define('Burger', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        devoured: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
            len: [1]
        },

        // Timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
    return Burger;
};