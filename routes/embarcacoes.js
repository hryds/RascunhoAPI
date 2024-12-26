const controller = require('../controllers/embarcacoes');
const router = require('express').Router();

// CRUD Routes /embarcacoes
router.get('/', controller.getEmbarcacoes); // /embarcacoes
router.get('/:embarcacaoId', controller.getEmbarcacao); // /embarcacoes/:embarcacaoId
router.post('/', controller.createEmbarcacao); // /embarcacoes
router.put('/:embarcacaoId', controller.updateEmbarcacao); // /embarcacoes/:embarcacaoId
router.delete('/:embarcacaoId', controller.deleteEmbarcacao); // /embarcacoes/:embarcacaoId

module.exports = router;