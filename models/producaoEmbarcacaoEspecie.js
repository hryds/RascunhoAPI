const Sequelize = require('sequelize');
const db = require('../data/database');

const Embarcacao = require('./embarcacao');
const Especie = require('./especie');
const User = require('./user');
const Producao = require('./producao');

// Mapa de Produção x Embarcação X Espécie -> P:N:M

const ProducaoEmbarcacaoEspecie = db.define('producaoEmbarcacaoEspecie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    producaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'producoes',
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
    },
    especieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'especies',
            key: 'id',
        }
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});
module.exports = ProducaoEmbarcacaoEspecie;