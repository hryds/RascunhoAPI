const UserEmbarcacao = require('../models/userEmbarcacao');

// CRUD Controllers

//get all userEmbarcacoes
exports.getUserEmbarcacoes = (req, res, next) => {
  UserEmbarcacao.findAll()
    .then(userEmbarcacao => {
      res.status(200).json({ userEmbarcacao: userEmbarcacao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}

//get userEmbarcacao by Id
exports.getUserEmbarcacao = (req, res, next) => {
  const userEmbarcacaoId = req.params.userEmbarcacaoId;
  UserEmbarcacao.findByPk(userEmbarcacaoId)
    .then(userEmbarcacao => {
      if (!userEmbarcacao) {
        return res.status(404).json({ message: 'UserEmbarcacao não encontrada.' });
      }
      res.status(200).json({ userEmbarcacao: userEmbarcacao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}

//create userEmbarcacao
exports.createUserEmbarcacao = (req, res, next) => {
  const userId = req.body.userId;
  const embarcacaoId = req.body.embarcacaoId;
  UserEmbarcacao.create({
    userId: userId,
    embarcacaoId: embarcacaoId
  })
    .then(result => {
      console.log('UserEmbarcacao criada.');
      res.status(201).json({
        message: 'UserEmbarcacao criada.',
        userEmbarcacao: result
      });
    })
    .catch(err => {
      console.error(err);

      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Campo duplicado.' });
      }

      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
      }

      res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
    });
}

//update userEmbarcacao
exports.updateUserEmbarcacao = (req, res, next) => {
  const userEmbarcacaoId = req.params.userEmbarcacaoId;
  const updateduserId = req.body.userId;
  const updatedembarcacaoId = req.body.embarcacaoId;
  UserEmbarcacao.findByPk(userEmbarcacaoId)
    .then(userEmbarcacao => {
      if (!userEmbarcacao) {
        return res.status(404).json({ message: 'UserEmbarcacao não encontrada.' });
      }
      userEmbarcacao.userId = updateduserId;
      userEmbarcacao.embarcacaoId = updatedembarcacaoId;
      return userEmbarcacao.save();
    })
    .then(result => {
      res.status(200).json({ message: 'UserEmbarcacao atualizada.', userEmbarcacao: result });
    })
    .catch(err => {
      console.error(err);

      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Campo duplicado.' });
      }

      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
      }

      res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
    });
}

//delete userEmbarcacao
exports.deleteUserEmbarcacao = (req, res, next) => {
  const userEmbarcacaoId = req.params.userEmbarcacaoId;
  UserEmbarcacao.findByPk(userEmbarcacaoId)
    .then(userEmbarcacao => {
      if (!userEmbarcacao) {
        return res.status(404).json({ message: 'UserEmbarcacao não encontrada.' });
      }
      return UserEmbarcacao.destroy({
        where: {
          id: userEmbarcacaoId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'UserEmbarcacao excluída.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}