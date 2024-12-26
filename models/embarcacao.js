const Sequelize = require('sequelize');
const db = require('../data/database');

const Embarcacao = db.define('embarcacao', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    rgp:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    uf:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Embarcacao;