const Sequelize = require('sequelize');
const db = require('../data/database');

const Especie = db.define('especie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeComum: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeCientifico: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false 
});

module.exports = Especie;
