const Sequelize = require('sequelize');
const db = require('../data/database');

const User = db.define('user', {
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
    email:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    cnpj:{
        type: Sequelize.DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    tipo:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    rgp:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cep:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    uf:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;