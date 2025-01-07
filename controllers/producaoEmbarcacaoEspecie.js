const ProducaoEmbarcacaoEspecie = require('../models/producaoEmbarcacaoEspecie');

// CRUD Controllers

//get all producaoEmbarcacaoEspecie
exports.getProducaoEmbarcacaoEspecies = (req, res, next) => {
  ProducaoEmbarcacaoEspecie.findAll()
    .then(producaoEmbarcacaoEspecie => {
      res.status(200).json({ producaoEmbarcacaoEspecie: producaoEmbarcacaoEspecie });
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
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
      console.log(err);
    });
}

//update ProducaoEmbarcacaoEspecie
exports.updateProducaoEmbarcacaoEspecie = (req, res, next) => {
  const updatedproducaoId = req.body.producaoId;
  const updatedespecieId = req.body.especieId;
  const updatedembarcacaoId = req.body.embarcacaoId;
  const updatedPeso = req.body.peso;
  ProducaoEmbarcacaoEspecie.findByPk(producaoEmbarcacaoEspecieId)
    .then(producaoEmbarcacaoEspecie => {
      if (!producaoEmbarcacaoEspecie) {
        return res.status(404).json({ message: 'ProducaoEmbarcacaoEspecienot found!' });
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
    .catch(err => console.log(err));
}

//delete producaoEmbarcacaoEspecie 
exports.deleteproducaoEmbarcacaoEspecie = (req, res, next) => {
  const producaoEmbarcacaoEspecieId = req.params.producaoEmbarcacaoEspecieId;
  ProducaoEmbarcacaoEspecie.findByPk(producaoEmbarcacaoEspecieId)
    .then(producaoEmbarcacaoEspecie => {
      if (!producaoEmbarcacaoEspecie) {
        return res.status(404).json({ message: 'producaoEmbarcacaoEspecie not found!' });
      }
      return ProducaoEmbarcacaoEspecie.destroy({
        where: {
          Id: producaoEmbarcacaoEspecieId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'producaoEmbarcacaoEspeciedeleted!' });
    })
    .catch(err => console.log(err));
}