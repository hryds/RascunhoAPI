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
        message: 'Erro',
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
        return res.status(404).json({ message: 'Embarcação não encontrada.' });
      }
      res.status(200).json({ embarcacao: embarcacao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
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
        return res.status(404).json({ message: 'Embarcação não encontrada.' });
      }
      res.status(200).json({ embarcacao: embarcacao });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
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
      console.log('Embarcação criada.');
      res.status(201).json({
        message: 'Embarcação criada.',
        embarcacao: result
      });
    })
    .catch(err => {
      console.error(err);

      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Embarcação duplicada.' });
      }

      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
      }


      res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
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
        return res.status(404).json({ message: 'Embarcação não encontrada.' });
      }
      embarcacao.nome = updatedNome;
      embarcacao.rgp = updatedRgp;
      return embarcacao.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Embarcação atualizada.', embarcacao: result });
    })
    .catch(err => {
      console.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Embarcação duplicada.' });
      }

      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Erro de validação: é necessário preencher todos os campos obrigatórios.', errors: err.errors });
      }

      res.status(500).json({ message: 'Um erro inesperado ocorreu, tente novamente.', error: err });
    });
}

// delete embarcacao
exports.deleteEmbarcacao = (req, res, next) => {
  const embarcacaoId = req.params.embarcacaoId;
  Embarcacao.findByPk(embarcacaoId)
    .then(embarcacao => {
      if (!embarcacao) {
        return res.status(404).json({ message: 'Embarcação não encontrada.' });
      }
      return Embarcacao.destroy({
        where: {
          id: embarcacaoId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Embarcação excluída.' });
    }).catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Erro',
        error: err.message
      });
    });

}