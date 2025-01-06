const controller = require('../controllers/producaoEmbarcacaoEspecie');
const router = require('express').Router();

// CRUD Routes /producaoEmbarcacaoEspecies
router.get('/', controller.getProducaoEmbarcacaoEspecies); // producaoEmbarcacaoEspecies
router.get('/:userEmbarcacaoId', controller.getProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId
router.post('/', controller.createProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies
router.put('/:userEmbarcacaoId', controller.updateProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId
router.delete('/:userEmbarcacaoId', controller.deleteproducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId

module.exports = router;