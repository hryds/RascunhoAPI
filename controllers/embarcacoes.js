const Embarcacao = require('../models/embarcacao');

// CRUD Embarcações

// get all embarcações

exports.getEmbarcacoes = (req, res, next) => {
  Embarcacao.findAll() //select * from 
    .then(embarcacoes => {
      res.status(200).json({ embarcacoes: embarcacoes });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
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
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}

// get embarcacao by rgp
exports.getEmbarcacaobyRGP = (req, res, next) => {
  const embarcacaoRGP = req.params.embarcacaoRGP;
  Embarcacao.findOne({
    where: { rgp: embarcacaoRGP }  
  })
    .then(embarcacao => {
      if (!embarcacao) {
        return res.status(404).json({ message: 'Embarcação not found!' });
      }
      res.status(200).json({ embarcacao: embarcacao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });
}



// create embarcacao
exports.createEmbarcacao = (req, res, next) => {
  const nome = req.body.nome;
  const rgp = req.body.rgp;

  Embarcacao.create({
    nome: nome,
    rgp: rgp,
  })
    .then(result => {
      console.log('Created Embarcação');
      res.status(201).json({
        message: 'Embarcação created successfully!',
        embarcacao: result
      });
    })
    .catch(err => {
      console.error(err);

      // Erro - Violação de Chave Única
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Duplicate Entry' });
      }

      // Erro - Campo obrigatório
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation Error', errors: err.errors });
      }

      // Erro - Outros
      res.status(500).json({ message: 'An unexpected error occurred.', error: err });
    });
};


// update embarcação
exports.updateEmbarcacao = (req, res, next) => {
  const embarcacaoId = req.params.embarcacaoId;
  const updatedNome = req.body.nome;
  const updatedRgp = req.body.rgp;
  Embarcacao.findByPk(embarcacaoId)
    .then(embarcacao => {
      if (!embarcacao) {
        return res.status(404).json({ message: 'Embarcacao not found!' });
      }
      embarcacao.nome = updatedNome;
      embarcacao.rgp = updatedRgp;
      return embarcacao.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Embarcacao updated!', embarcacao: result });
    })
    .catch(err => {
      console.error(err);

      // Erro - Violação de Chave Única
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Duplicate Entry' });
      }

      // Erro - Campo obrigatório
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation Error', errors: err.errors });
      }

      // Erro - Outros
      res.status(500).json({ message: 'An unexpected error occurred.', error: err });
    });
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
    }).catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error',
        error: err.message
      });
    });

}