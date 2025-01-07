const UserEmbarcacao = require('../models/userEmbarcacao');

// CRUD Controllers

//get all userEmbarcacoes
exports.getUserEmbarcacoes = (req, res, next) => {
  UserEmbarcacao.findAll()
    .then(userEmbarcacao => {
      res.status(200).json({ userEmbarcacao: userEmbarcacao });
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
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
      console.log(err);
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
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
}