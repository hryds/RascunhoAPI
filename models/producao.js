const Sequelize = require('sequelize');
const db = require('../data/database');

const Producao = db.define('producao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataInicial:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dataFinal:{
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});

module.exports = Producao;