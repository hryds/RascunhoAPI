const controller = require('../controllers/userEmbarcacao');
const router = require('express').Router();

// CRUD Routes /users
router.get('/', controller.getUserEmbarcacoes); // /userEmbarcacoes
router.get('/:userEmbarcacaoId', controller.getUserEmbarcacao); // /userEmbarcacao/:userEmbarcacaoId
router.post('/', controller.createuserEmbarcacao); // /userEmbarcacao
router.put('/:userEmbarcacaoId', controller.updateuserEmbarcacao); // /userEmbarcacao/:userEmbarcacaoId
router.delete('/:userEmbarcacaoId', controller.deleteuserEmbarcacao); // /userEmbarcacao/:userEmbarcacaoId

module.exports = router;