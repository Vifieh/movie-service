const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

const Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        tableName: "movies"
    }
);

module.exports = Movie;