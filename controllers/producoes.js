const Producao = require('../models/producao');


// CRUD Controllers

//get all producoes
exports.getProducoes = (req, res, next) => {
  Producao.findAll()
    .then(producoes => {
      res.status(200).json({ producoes: producoes });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}

//get producao by id
exports.getProducao = (req, res, next) => {
  const producaoId = req.params.producaoId;
  Producao.findByPk(producaoId)
    .then(producao => {
      if (!producao) {
        return res.status(404).json({ message: 'Produção não encontrada.' });
      }
      res.status(200).json({ producao: producao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}

//create producao
exports.createProducao = (req, res, next) => {
  const dataInicial = req.body.dataInicial;
  const dataFinal = req.body.dataFinal;
  const userId = req.body.userId;
  Producao.create({
    dataInicial: dataInicial,
    dataFinal: dataFinal,
    userId: userId,
  })
    .then(result => {
      console.log('Produção criada.');
      res.status(201).json({
        message: 'Produção criada.',
        producao: result
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

//update producao
exports.updateProducao = (req, res, next) => {
  const producaoId = req.params.producaoId;
  const updatedDataInicial = req.body.dataInicial;
  const updatedDataFinal = req.body.dataFinal;
  const updatedUserId = req.body.userId;

  Producao.findByPk(producaoId)
    .then(producao => {
      if (!producao) {
        return res.status(404).json({ message: 'Produção não encontrada.' });
      }
      producao.dataInicial = updatedDataInicial;
      producao.dataFinal = updatedDataFinal;
      producao.userId = updatedUserId;
      return producao.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Produção atualizada.', producao: result });
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

//delete producao
exports.deleteProducao = (req, res, next) => {
  const producaoId = req.params.producaoId;
  Producao.findByPk(producaoId)
    .then(producao => {
      if (!producao) {
        return res.status(404).json({ message: 'Produção não encontrada.' });
      }
      return Producao.destroy({
        where: {
          id: producaoId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Produção excluída.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}
