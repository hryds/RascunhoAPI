const ProducaoEmbarcacaoEspecie = require('../models/producaoEmbarcacaoEspecie');
const User = require('../models/user');
const Producao = require('../models/producao');
const Especie = require('../models/especie');
const Embarcacao = require('../models/embarcacao');

//get all Mapas de Produção by UserID
exports.getAllProducaoByUserId = (req, res, next) => {
    const userId = req.params.userId;
    console.log(req.params);
    Producao.findAll({
        where: { userId },
        include: [
            {
                model: ProducaoEmbarcacaoEspecie,
                include: [
                    { model: Embarcacao },
                    { model: Especie }
                ]
            }
        ]
    }).then(producoes => {
        res.status(200).json({ producoes: producoes });
    })
        .catch(err => console.log(err));
}




