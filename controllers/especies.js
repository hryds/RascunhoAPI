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
        message: 'Erro',
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
        return res.status(404).json({ message: 'Espécie não encontrada.' });
      }
      res.status(200).json({ especie: especie });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
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
      console.log('Espécie criada.');
      res.status(201).json({
        message: 'Espécie criada.',
        especie: result
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

//update especie
exports.updateEspecie = (req, res, next) => {
  const especieId = req.params.especieId;
  const updatedNomeComum = req.body.nomeComum;
  const updatedNomeCientifico = req.body.nomeCientifico;
  Especie.findByPk(especieId)
    .then(especie => {
      if (!especie) {
        return res.status(404).json({ message: 'Espécie não encontrada.' });
      }
      especie.nomeComum = updatedNomeComum;
      especie.nomeCientifico = updatedNomeCientifico;
      return especie.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Espécie atualizada.', especie: result });
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

//delete especie
exports.deleteEspecie = (req, res, next) => {
  const especieId = req.params.especieId;
  Especie.findByPk(especieId)
    .then(especie => {
      if (!especie) {
        return res.status(404).json({ message: 'Espécie não encontrada.' });
      }
      return Especie.destroy({
        where: {
          id: especieId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Espécie excluída.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}