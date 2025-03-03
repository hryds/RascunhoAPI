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
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN;
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
});



//test route
app.get('/', (req, res, next) => {
  res.send('Hello World');
});


// middleware - cookies
app.use(cookieParser());

//CRUD routes
app.use('/users', require('./routes/users'));
app.use('/embarcacoes', require('./routes/embarcacoes'));
app.use('/especies', require('./routes/especies'));
app.use('/producoes', require('./routes/producoes'));
app.use('/userEmbarcacoes', require('./routes/userEmbarcacao'));
app.use('/ProducaoEmbarcacaoEspecies', require('./routes/producaoEmbarcacaoEspecie'));
app.use('/consultas', require('./routes/consultas'));
app.use('/upload', require('./routes/fileUpload'));

// auth routes
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refreshToken'));
app.use('/logout', require('./routes/logout'));

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