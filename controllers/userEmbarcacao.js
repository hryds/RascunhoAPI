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
        message: 'Error',
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
        return res.status(404).json({ message: 'UserEmbarcacao not found!' });
      }
      res.status(200).json({ userEmbarcacao: userEmbarcacao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
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
      console.log('Created UserEmbarcacao');
      res.status(201).json({
        message: 'UserEmbarcacao created successfully!',
        userEmbarcacao: result
      });
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

//update userEmbarcacao
exports.updateUserEmbarcacao = (req, res, next) => {
  const userEmbarcacaoId = req.params.userEmbarcacaoId;
  const updateduserId = req.body.userId;
  const updatedembarcacaoId = req.body.embarcacaoId;
  UserEmbarcacao.findByPk(userEmbarcacaoId)
    .then(userEmbarcacao => {
      if (!userEmbarcacao) {
        return res.status(404).json({ message: 'UserEmbarcacao not found!' });
      }
      userEmbarcacao.userId = updateduserId;
      userEmbarcacao.embarcacaoId = updatedembarcacaoId;
      return userEmbarcacao.save();
    })
    .then(result => {
      res.status(200).json({ message: 'UserEmbarcacao updated!', userEmbarcacao: result });
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

//delete userEmbarcacao
exports.deleteUserEmbarcacao = (req, res, next) => {
  const userEmbarcacaoId = req.params.userEmbarcacaoId;
  UserEmbarcacao.findByPk(userEmbarcacaoId)
    .then(userEmbarcacao => {
      if (!userEmbarcacao) {
        return res.status(404).json({ message: 'UserEmbarcacao not found!' });
      }
      return UserEmbarcacao.destroy({
        where: {
          id: userEmbarcacaoId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'UserEmbarcacao deleted!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}