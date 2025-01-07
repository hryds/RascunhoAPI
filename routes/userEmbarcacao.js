const controller = require('../controllers/userEmbarcacao');
const router = require('express').Router();

// CRUD Routes /userEmbarcacoes
router.get('/', controller.getUserEmbarcacoes); // /userEmbarcacoes
router.get('/:userEmbarcacaoId', controller.getUserEmbarcacao); // /userEmbarcacao/:userEmbarcacaoId
router.post('/', controller.createUserEmbarcacao); // /userEmbarcacao
router.put('/:userEmbarcacaoId', controller.updateUserEmbarcacao); // /userEmbarcacao/:userEmbarcacaoId
router.delete('/:userEmbarcacaoId', controller.deleteUserEmbarcacao); // /userEmbarcacao/:userEmbarcacaoId

module.exports = router;