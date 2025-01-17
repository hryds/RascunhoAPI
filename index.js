const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./data/database');
const User = require('./models/user');
const Embarcacao = require('./models/embarcacao');
const Especie = require('./models/especie');
const Producao = require('./models/producao');
const errorHandler = require('./middlewares/errorHandler');
const associations = require('./models/associations');
const UserEmbarcacao = require('./models/userEmbarcacao');
const ProducaoEmbarcacaoEspecie = require('./models/producaoEmbarcacaoEspecie');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  next();
});




//test route
app.get('/', (req, res, next) => {
  res.send('Hello World');
});

//CRUD routes
app.use('/users', require('./routes/users'));
app.use('/embarcacoes', require('./routes/embarcacoes'));
app.use('/especies', require('./routes/especies'));
app.use('/producoes', require('./routes/producoes'));
app.use('/userEmbarcacoes', require('./routes/userEmbarcacao'));
app.use('/ProducaoEmbarcacaoEspecies', require('./routes/producaoEmbarcacaoEspecie'));
app.use('/consultas', require('./routes/consultas'));

//error handling
app.use(errorHandler);

//sync database
sequelize
  .sync({ alter: true })
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));