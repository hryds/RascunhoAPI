const Producao = require('../models/producao');

// CRUD Controllers

//get all producoes
exports.getProducoes = (req, res, next) => {
    Producao.findAll()
        .then(producoes => {
            res.status(200).json({ producoes: producoes });
        })
        .catch(err => console.log(err));
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
        .catch(err => console.log(err));
}

//create producao
exports.createProducao = (req, res, next) => {
  const dataInicial = req.body.dataInicial;
  const dataFinal = req.body.dataFinal;
  Producao.create({
    dataInicial: dataInicial,
    dataFinal: dataFinal
  })
    .then(result => {
      console.log('Created Producao');
      res.status(201).json({
        message: 'Producao created successfully!',
        producao: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

//update producao
exports.updateProducao = (req, res, next) => {
  const producaoId = req.params.producaoId;
  const updatedDataInicial = req.body.dataInicial;
  const updatedDataFinal = req.body.dataFinal;
  Producao.findByPk(producaoId)
    .then(producao => {
      if (!producao) {
        return res.status(404).json({ message: 'Producao not found!' });
      }
      producao.dataInicial = updatedDataInicial;
      producao.dataFinal = updatedDataFinal;
      return producao.save();
    })
    .then(result => {
      res.status(200).json({message: 'Producao updated!', producao: result});
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
}