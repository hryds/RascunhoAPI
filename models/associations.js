const Sequelize = require('sequelize');
const Embarcacao = require('../models/embarcacao');
const Especie = require('../models/especie');
const User = require('../models/user');
const Producao = require('../models/producao');
const UserEmbarcacao = require('../models/userEmbarcacao');
const ProducaoEmbarcacaoEspecie = require('../models/producaoEmbarcacaoEspecie');

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
  foreignKey: 'userId',
  otherKey: 'embarcacaoId',
});

Embarcacao.belongsToMany(User, {
  through: UserEmbarcacao,
  foreignKey: 'embarcacaoId',
  otherKey: 'userId',
});

// Mapa de Produção x Embarcação X Espécie -> P:N:M


// Producao
Producao.belongsToMany(Embarcacao, {
  through: ProducaoEmbarcacaoEspecie,
  foreignKey: 'producaoId',
  otherKey: 'embarcacaoId',
});

Producao.belongsToMany(Especie, {
  through: ProducaoEmbarcacaoEspecie,
  foreignKey: 'producaoId',
  otherKey: 'especieId',
});

// Embarcação
Embarcacao.belongsToMany(Producao, {
  through: ProducaoEmbarcacaoEspecie,
  foreignKey: 'embarcacaoId',
  otherKey: 'producaoId',
});

Embarcacao.belongsToMany(Especie, {
  through: ProducaoEmbarcacaoEspecie,
  foreignKey: 'embarcacaoId',
  otherKey: 'especieId',
});

// Especie
Especie.belongsToMany(Producao, {
  through: ProducaoEmbarcacaoEspecie,
  foreignKey: 'especieId',
  otherKey: 'producaoId',
});

Especie.belongsToMany(Embarcacao, {
  through: ProducaoEmbarcacaoEspecie,
  foreignKey: 'especieId',
  otherKey: 'embarcacaoId',
});
