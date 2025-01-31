const controller = require('../controllers/embarcacoes');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

// CRUD Routes /embarcacoes
router.get('/', verifyJWT, controller.getEmbarcacoes); // /embarcacoes
router.get('/:embarcacaoId', verifyJWT, controller.getEmbarcacao); // /embarcacoes/:embarcacaoId
router.get('/rgp/:embarcacaoRGP', verifyJWT, controller.getEmbarcacaobyRGP) // /embarcacoes/rgp/:embarcacaoRGP
router.post('/', verifyJWT, controller.createEmbarcacao); // /embarcacoes
router.put('/:embarcacaoId', verifyJWT, controller.updateEmbarcacao); // /embarcacoes/:embarcacaoId
router.delete('/:embarcacaoId', verifyJWT, controller.deleteEmbarcacao); // /embarcacoes/:embarcacaoId

module.exports = router;