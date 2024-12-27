const Embarcacao = require('../models/embarcacao');
const Especie = require('../models/especie');
const User = require('../models/user');
const Producao = require('../models/producao');


// Empresa x Mapa de Produção -> 1:N

User.hasMany(Producao, {
    foreignKey: 'userId'
});

Producao.belongsTo(User, {
    foreignKey: 'userId'
});

