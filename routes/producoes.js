const controller = require('../controllers/producoes');
const router = require('express').Router();

// CRUD Routes /users
router.get('/', controller.getProducoes); // /producoes
router.get('/:producaoId', controller.getProducao); // /producoes/:producaoId
router.post('/', controller.createProducao); // /producoes
router.put('/:producaoId', controller.updateProducao); // /producoes/:producaoId
router.delete('/:producaoId', controller.deleteProducao); // /producoes/:producaoId

module.exports = router;