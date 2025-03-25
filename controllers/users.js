const User = require('../models/user');
const bcrypt = require('bcrypt');
const { sendWelcomeEmail, sendPasswordResetEmail, sendRejectedStatusEmail, sendStatusEmail } = require('../utils/mailer');

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
        message: 'Erro ao recuperar usuários.',
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
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      res.status(200).json({ user: user });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro ao recuperar usuário.',
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
  const refreshtoken = req.body.refreshtoken;
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
      refreshtoken: refreshtoken,
    });

    res.status(201).json({
      message: 'Usuário criado.',
      user: user,
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      const duplicatedFields = err.errors.map(error => error.path);
      return res.status(400).json({
        message: `${duplicatedFields.join(', ')} já cadastrado.`,
        fields: duplicatedFields
      });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
    }
    res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
  }
};

// update user
exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedNome = req.body.nome;
  const updatedPassword = req.body.password;
  const updatedEmail = req.body.email;
  const updatedCnpj = req.body.cnpj;
  const updatedTipo = req.body.tipo;
  const updatedStatus = req.body.status;
  const updatedRgp = req.body.rgp;
  const updatedCep = req.body.cep;
  const updatedComplemento = req.body.complemento;
  const updatedrefreshtoken = req.body.refreshtoken;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    user.nome = updatedNome;
    user.email = updatedEmail;
    user.cnpj = updatedCnpj;
    user.tipo = updatedTipo;
    user.status = updatedStatus;
    user.rgp = updatedRgp;
    user.cep = updatedCep;
    user.complemento = updatedComplemento;
    user.refreshtoken = updatedrefreshtoken;

    if (updatedPassword) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(updatedPassword, saltRounds);
    }

    const result = await user.save();
    res.status(200).json({ message: 'Usuário atualizado.', user: result });
  } catch (err) {
    console.error(err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Campo duplicado.' });
    }

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
    }

    res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
  }
};


exports.updateUserNoPassword = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedNome = req.body.nome;
  const updatedEmail = req.body.email;
  const updatedCnpj = req.body.cnpj;
  const updatedRgp = req.body.rgp;
  const updatedCep = req.body.cep;
  const updatedComplemento = req.body.complemento;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    user.nome = updatedNome;
    user.email = updatedEmail;
    user.cnpj = updatedCnpj;
    user.rgp = updatedRgp;
    user.cep = updatedCep;
    user.complemento = updatedComplemento;

    const result = await user.save();
    res.status(200).json({ message: 'Usuário atualizado.', user: result });
  } catch (err) {
    console.error(err);


    if (err.name === 'SequelizeUniqueConstraintError') {
      const duplicatedFields = err.errors.map(error => error.path);
      return res.status(400).json({
        message: `${duplicatedFields.join(', ')} já cadastrado.`,
        fields: duplicatedFields
      });
    }

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
    }

    res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
  }
};


// update userStatus
exports.updateUserStatus = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedStatus = req.body.status;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (updatedStatus === undefined) {
      return res.status(400).json({ message: `O campo "status" é obrigatório.` });
    }
    user.status = updatedStatus;

    const result = await user.save();

    if (updatedStatus.toLowerCase() === 'aprovado') {
      await sendStatusEmail(user.email, user.nome);
    } else {
      await sendRejectedStatusEmail(user.email, user.nome);
    }

    res.status(200).json({ message: 'Status atualizado.', user: result });

  } catch (err) {
    console.error(err);

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
    }

    res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
  }
};

exports.updateUserType = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedTipo = req.body.tipo;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (updatedTipo === undefined) {
      return res.status(400).json({ message: `O campo "tipo" é obrigatório.` });
    }
    user.tipo = updatedTipo;

    const result = await user.save();
    res.status(200).json({ message: 'Tipo atualizado.', user: result });
  } catch (err) {
    console.error(err);

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
    }

    res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
  }
};

// update password
exports.updateUserPassword = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedPassword = req.body.password;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (updatedPassword) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(updatedPassword, saltRounds);
    }

    const result = await user.save();
    res.status(200).json({ message: 'Senha alterada.', user: result });
  } catch (err) {
    console.error(err);

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
    }

    res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
  }
};

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Usuário excluído.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}



exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    user.password = hashedPassword;
    await user.save();
    await sendPasswordResetEmail(email, tempPassword);

    res.status(200).json({ message: 'Senha temporária enviada para o seu email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao processar recuperação de senha. Tente novamente mais tarde.' });
  }
};
