const Sequelize = require('sequelize');
const Embarcacao = require('../models/embarcacao');
const Especie = require('../models/especie');
const User = require('../models/user');
const Producao = require('../models/producao');
const UserEmbarcacao = require('../models/userEmbarcacao');


// Empresa x Mapa de Produção -> 1:N

User.hasMany(Producao, {
    foreignKey: 'userId'
});

Producao.belongsTo(User, {
    foreignKey: 'userId'
});


// Empresa x Embarcação -> N:M

User.belongsToMany(Embarcacao, {
    through: UserEmbarcacao,
    foreignKey: 'userId',  // Chave estrangeira para o User
    otherKey: 'embarcacaoId', // Chave estrangeira para a Embarcação
});

Embarcacao.belongsToMany(User, {
    through: UserEmbarcacao,
    foreignKey: 'embarcacaoId', // Chave estrangeira para a Embarcação
    otherKey: 'userId', // Chave estrangeira para o User
});