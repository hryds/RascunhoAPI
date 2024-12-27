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
            model: 'users', // Nome da tabela de usuários
            key: 'id', // Chave primária da tabela de usuários
        }
    },
    embarcacaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'embarcacaos', // Nome da tabela de embarcações
            key: 'id', // Chave primária da tabela de embarcações
        }
    }
});
module.exports = UserEmbarcacao;