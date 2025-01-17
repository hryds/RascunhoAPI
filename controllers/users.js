const User = require('../models/user');
const bcrypt = require('bcrypt');

// CRUD Controllers

//get all users
exports.getUsers = (req, res, next) => {
  User.findAll() //select * from users
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

//get user by id
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json({ user: user });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

//create user
exports.createUser = async (req, res, next) => {
  const nome = req.body.nome;
  const password = req.body.password;
  const email = req.body.email;
  const cnpj = req.body.cnpj;
  const tipo = req.body.tipo;
  const status = req.body.status;
  const rgp = req.body.rgp;
  const cep = req.body.cep;
  const complemento = req.body.complemento;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      nome: nome,
      password: hashedPassword,
      email: email,
      cnpj: cnpj,
      tipo: tipo,
      status: status,
      rgp: rgp,
      cep: cep,
      complemento: complemento,
    });

    res.status(201).json({
      message: 'User created successfully!',
      user: user,
    });
  } catch (err) {
    console.error(err);
    // Erro específico de violação de chave única
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Duplicate entry detected for RGP or other unique field.' });
    }

    // Erro de validação de campo obrigatório
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error: missing required fields.', errors: err.errors });
    }

    // Erro genérico
    res.status(500).json({ message: 'An unexpected error occurred.', error: err });
  }
};


//update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedNome = req.body.nome;
  const updatedPassword = req.body.password;
  const updatedEmail = req.body.email;
  const updatedCnpj = req.body.cnpj;
  const updatedTipo = req.body.tipo;
  const updatedStatus = req.body.status;
  const updatedRgp = req.body.rgp;
  const updatedCep = req.body.cep;
  const updatedComplemento = req.body.uf;

  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      user.nome = updatedNome;
      user.password = updatedPassword;
      user.email = updatedEmail;
      user.cnpj = updatedCnpj;
      user.tipo = updatedTipo;
      user.status = updatedStatus;
      user.rgp = updatedRgp;
      user.cep = updatedCep;
      user.complemento = updatedComplemento;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch(err => {
      console.error(err);

      // Erro específico de violação de chave única
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Duplicate entry detected for RGP or other unique field.' });
      }

      // Erro de validação de campo obrigatório
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation error: missing required fields.', errors: err.errors });
      }

      // Erro genérico
      res.status(500).json({ message: 'An unexpected error occurred.', error: err });
    });
}

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}