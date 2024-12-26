const Embarcacao = require('../models/embarcacao');

// CRUD Embarcações

// get all embarcações

exports.getEmbarcacoes = (req, res, next) => {
    Embarcacao.findAll() //select * from 
        .then(embarcacoes => {
            res.status(200).json({ embarcacoes: embarcacoes });
        })
        .catch(err => console.log(err));
}

// get embarcacao by id
exports.getEmbarcacao = (req, res, next) => {
    const embarcacaoId = req.params.embarcacaoId;
    Embarcacao.findByPk(embarcacaoId)
        .then(embarcacao => {
            if (!embarcacao) { 
                return res.status(404).json({ message: 'Embarcação not found!' });
            }
            res.status(200).json({ embarcacao: embarcacao });
        })
        .catch(err => console.log(err));
}

// create embarcacao

exports.createEmbarcacao = (req, res, next) => {
    const name = req.body.name;
    const rgp = req.body.rgp;
    const uf = req.body.uf;
    Embarcacao.create({
      name: name,
      rgp: rgp,
      uf: uf
    })
      .then(result => {
        console.log('Created Embarcação');
        res.status(201).json({
          message: 'Embarcação created successfully!',
          embarcacao: result
        });
      })
      .catch(err => {
        console.log(err);
      }); 
}

// update embarcação

exports.updateEmbarcacao = (req, res, next) => {
  const embarcacaoId = req.params.embarcacaoIdId;
  const updatedName = req.body.name;
  const updatedRgp = req.body.rgp;
  const updatedUf = req.body.uf;
  Embarcacao.findByPk(embarcacaoId)
    .then(embarcacao => {
      if (!embarcacao) {
        return res.status(404).json({ message: 'Embarcacao not found!' });
      }
      embarcacao.name = updatedName;
      embarcacao.rgp = updatedRgp;
      embarcacao.uf = updatedUf;
      return embarcacao.save();
    })
    .then(result => {
      res.status(200).json({message: 'Embarcacao updated!', embarcacao: result});
    })
    .catch(err => console.log(err));
}

// delete embarcacao

exports.deleteEmbarcacao = (req, res, next) => {
    const embarcacaoId = req.params.embarcacaoId;
    Embarcacao.findByPk(embarcacaoId)
      .then(embarcacao => {
        if (!embarcacao) {
          return res.status(404).json({ message: 'Embarcacao not found!' });
        }
        return Embarcacao.destroy({
          where: {
            id: embarcacaoId
          }
        });
      })
      .then(result => {
        res.status(200).json({ message: 'Embarcacao deleted!' });
      })
      .catch(err => console.log(err));
  }