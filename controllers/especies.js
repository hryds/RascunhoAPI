const Especie = require('../models/especie');

// CRUD Controllers

//get all especies
exports.getEspecies = (req, res, next) => {
    Especie.findAll()
        .then(especies => {
            res.status(200).json({ especies: especies });
        })
        .catch(err => console.log(err));
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
        .catch(err => console.log(err));
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
      console.log(err);
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
      res.status(200).json({message: 'Especie updated!', especie: result});
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
}