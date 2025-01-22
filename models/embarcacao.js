const Sequelize = require('sequelize');
const db = require('../data/database');

const Embarcacao = db.define('embarcacao', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    rgp: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        tableName: 'embarcacoes'

    }
);

module.exports = Embarcacao;