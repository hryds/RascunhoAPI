const Sequelize = require('sequelize');
const db = require('../data/database');

const Embarcacao = require('./embarcacao');
const Especie = require('./especie');
const User = require('./user');
const Producao = require('./producao');

// Empresa x Embarcação -> N:M

const UserEmbarcacao = db.define('userEmbarcacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id', 
        }
    },
    embarcacaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'embarcacoes', 
            key: 'id', 
        }
    }
},
    {
        tableName: 'userEmbarcacoes'

    });
module.exports = UserEmbarcacao;