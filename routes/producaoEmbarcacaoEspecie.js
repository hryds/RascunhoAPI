const controller = require('../controllers/producaoEmbarcacaoEspecie');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

// CRUD Routes /producaoEmbarcacaoEspecies
router.get('/', verifyJWT, controller.getProducaoEmbarcacaoEspecies); // producaoEmbarcacaoEspecies
router.get('/:producaoEmbarcacaoEspecieId', verifyJWT, controller.getProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId
router.post('/', verifyJWT, controller.createProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies
router.put('/:producaoEmbarcacaoEspecieId', verifyJWT, controller.updateProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId
router.delete('/:producaoEmbarcacaoEspecieId', verifyJWT, controller.deleteProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId

module.exports = router;