const Especie = require('../models/especie');

// CRUD Controllers

//get all especies
exports.getEspecies = (req, res, next) => {
  Especie.findAll()
    .then(especies => {
      res.status(200).json({ especies: especies });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

//get especie by id
exports.getEspecie = (req, res, next) => {
  const especieId = req.params.especieId;
  Especie.findByPk(especieId)
    .then(especie => {
      if (!especie) {
        return res.status(404).json({ message: 'Especie not found!' });
      }
      res.status(200).json({ especie: especie });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

//create especie
exports.createEspecie = (req, res, next) => {
  const nomeComum = req.body.nomeComum;
  const nomeCientifico = req.body.nomeCientifico;
  Especie.create({
    nomeComum: nomeComum,
    nomeCientifico: nomeCientifico
  })
    .then(result => {
      console.log('Created Especie');
      res.status(201).json({
        message: 'Especie created successfully!',
        especie: result
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

//update especie
exports.updateEspecie = (req, res, next) => {
  const especieId = req.params.especieId;
  const updatedNomeComum = req.body.nomeComum;
  const updatedNomeCientifico = req.body.nomeCientifico;
  Especie.findByPk(especieId)
    .then(especie => {
      if (!especie) {
        return res.status(404).json({ message: 'Especie not found!' });
      }
      especie.nomeComum = updatedNomeComum;
      especie.nomeCientifico = updatedNomeCientifico;
      return especie.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Especie updated!', especie: result });
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

//delete especie
exports.deleteEspecie = (req, res, next) => {
  const especieId = req.params.especieId;
  Especie.findByPk(especieId)
    .then(especie => {
      if (!especie) {
        return res.status(404).json({ message: 'Especie not found!' });
      }
      return Especie.destroy({
        where: {
          id: especieId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Especie deleted!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}