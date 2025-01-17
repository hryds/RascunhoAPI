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
        message: 'Error',
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
        return res.status(404).json({ message: 'Producao not found!' });
      }
      res.status(200).json({ producao: producao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
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
      console.log('Created Producao');
      res.status(201).json({
        message: 'Producao created successfully!',
        producao: result
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

//update producao
exports.updateProducao = (req, res, next) => {
  const producaoId = req.params.producaoId;
  const updatedDataInicial = req.body.dataInicial;
  const updatedDataFinal = req.body.dataFinal;
  const updatedUserId = req.body.userId;

  Producao.findByPk(producaoId)
    .then(producao => {
      if (!producao) {
        return res.status(404).json({ message: 'Producao not found!' });
      }
      producao.dataInicial = updatedDataInicial;
      producao.dataFinal = updatedDataFinal;
      producao.userId = updatedUserId;
      return producao.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Producao updated!', producao: result });
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

//delete producao
exports.deleteProducao = (req, res, next) => {
  const producaoId = req.params.producaoId;
  Producao.findByPk(producaoId)
    .then(producao => {
      if (!producao) {
        return res.status(404).json({ message: 'Producao not found!' });
      }
      return Producao.destroy({
        where: {
          id: producaoId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Producao deleted!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}
