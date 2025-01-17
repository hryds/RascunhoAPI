const ProducaoEmbarcacaoEspecie = require('../models/producaoEmbarcacaoEspecie');

// CRUD Controllers

//get all producaoEmbarcacaoEspecie
exports.getProducaoEmbarcacaoEspecies = (req, res, next) => {
  ProducaoEmbarcacaoEspecie.findAll()
    .then(producaoEmbarcacaoEspecie => {
      res.status(200).json({ producaoEmbarcacaoEspecie: producaoEmbarcacaoEspecie });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

//get producaoEmbarcacaoEspecie by Id
exports.getProducaoEmbarcacaoEspecie = (req, res, next) => {
  const producaoEmbarcacaoEspecieId = req.params.producaoEmbarcacaoEspecieId;
  ProducaoEmbarcacaoEspecie.findByPk(producaoEmbarcacaoEspecieId)
    .then(producaoEmbarcacaoEspecie => {
      if (!producaoEmbarcacaoEspecie) {
        return res.status(404).json({ message: 'producaoEmbarcacaoEspecie not found!' });
      }
      res.status(200).json({ producaoEmbarcacaoEspecie: producaoEmbarcacaoEspecie });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

//create producaoEmbarcacaoEspecie
exports.createProducaoEmbarcacaoEspecie = (req, res, next) => {
  const producaoId = req.body.producaoId;
  const especieId = req.body.especieId;
  const embarcacaoId = req.body.embarcacaoId;
  const peso = req.body.peso;
  ProducaoEmbarcacaoEspecie.create({
    producaoId: producaoId,
    embarcacaoId: embarcacaoId,
    especieId: especieId,
    peso: peso,
  })
    .then(result => {
      console.log('Created ProducaoEmbarcacaoEspecie');
      res.status(201).json({
        message: 'ProducaoEmbarcacaoEspecie created successfully!',
        producaoEmbarcacaoEspecie: result
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

//update ProducaoEmbarcacaoEspecie
exports.updateProducaoEmbarcacaoEspecie = (req, res, next) => {
  const producaoEmbarcacaoEspecieId = req.params.producaoEmbarcacaoEspecieId;
  console.log(producaoEmbarcacaoEspecieId);
  const updatedproducaoId = req.body.producaoId;
  const updatedespecieId = req.body.especieId;
  const updatedembarcacaoId = req.body.embarcacaoId;
  const updatedPeso = req.body.peso;
  ProducaoEmbarcacaoEspecie.findByPk(producaoEmbarcacaoEspecieId)
    .then(producaoEmbarcacaoEspecie => {
      if (!producaoEmbarcacaoEspecie) {
        return res.status(404).json({ message: 'ProducaoEmbarcacaoEspecie not found!' });
      }
      producaoEmbarcacaoEspecie.producaoId = updatedproducaoId;
      producaoEmbarcacaoEspecie.embarcacaoId = updatedembarcacaoId;
      producaoEmbarcacaoEspecie.especieId = updatedespecieId;
      producaoEmbarcacaoEspecie.peso = updatedPeso;
      return producaoEmbarcacaoEspecie.save();
    })
    .then(result => {
      res.status(200).json({ message: ' producaoEmbarcacaoEspecie updated!', producaoEmbarcacaoEspecie: result });
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

//delete producaoEmbarcacaoEspecie 
exports.deleteProducaoEmbarcacaoEspecie = (req, res, next) => {
  const producaoEmbarcacaoEspecieId = req.params.producaoEmbarcacaoEspecieId;
  ProducaoEmbarcacaoEspecie.findByPk(producaoEmbarcacaoEspecieId)
    .then(producaoEmbarcacaoEspecie => {
      if (!producaoEmbarcacaoEspecie) {
        return res.status(404).json({ message: 'producaoEmbarcacaoEspecie not found!' });
      }
      return ProducaoEmbarcacaoEspecie.destroy({
        where: {
          id: producaoEmbarcacaoEspecieId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'producaoEmbarcacaoEspeciedeleted!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}