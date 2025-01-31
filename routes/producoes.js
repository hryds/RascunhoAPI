const controller = require('../controllers/producoes');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

// CRUD Routes /producoes
router.get('/', verifyJWT, controller.getProducoes); // /producoes
router.get('/:producaoId', verifyJWT, controller.getProducao); // /producoes/:producaoId
router.post('/', verifyJWT, controller.createProducao); // /producoes
router.put('/:producaoId', verifyJWT, controller.updateProducao); // /producoes/:producaoId
router.delete('/:producaoId', verifyJWT, controller.deleteProducao); // /producoes/:producaoId

module.exports = router;