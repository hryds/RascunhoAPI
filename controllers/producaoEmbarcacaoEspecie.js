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
        message: 'Erro',
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
        return res.status(404).json({ message: 'producaoEmbarcacaoEspecie não encontrada.' });
      }
      res.status(200).json({ producaoEmbarcacaoEspecie: producaoEmbarcacaoEspecie });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
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
      console.log('ProducaoEmbarcacaoEspecie criada.');
      res.status(201).json({
        message: 'ProducaoEmbarcacaoEspecie criada.',
        producaoEmbarcacaoEspecie: result
      });
    })
    .catch(err => {
      console.error(err);

      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'RGP Duplicado.' });
      }

      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
      }

      res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
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
        return res.status(404).json({ message: 'ProducaoEmbarcacaoEspecie não encontrada.' });
      }
      producaoEmbarcacaoEspecie.producaoId = updatedproducaoId;
      producaoEmbarcacaoEspecie.embarcacaoId = updatedembarcacaoId;
      producaoEmbarcacaoEspecie.especieId = updatedespecieId;
      producaoEmbarcacaoEspecie.peso = updatedPeso;
      return producaoEmbarcacaoEspecie.save();
    })
    .then(result => {
      res.status(200).json({ message: ' producaoEmbarcacaoEspecie atualizada.', producaoEmbarcacaoEspecie: result });
    })
    .catch(err => {
      console.error(err);

      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'RGP Duplicado.' });
      }

      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
      }

      res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
    });
}

//delete producaoEmbarcacaoEspecie 
exports.deleteProducaoEmbarcacaoEspecie = (req, res, next) => {
  const producaoEmbarcacaoEspecieId = req.params.producaoEmbarcacaoEspecieId;
  ProducaoEmbarcacaoEspecie.findByPk(producaoEmbarcacaoEspecieId)
    .then(producaoEmbarcacaoEspecie => {
      if (!producaoEmbarcacaoEspecie) {
        return res.status(404).json({ message: 'producaoEmbarcacaoEspecie não encontrada.' });
      }
      return ProducaoEmbarcacaoEspecie.destroy({
        where: {
          id: producaoEmbarcacaoEspecieId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'producaoEmbarcacaoEspecie excluída.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });
}