const controller = require('../controllers/producaoEmbarcacaoEspecie');
const router = require('express').Router();

// CRUD Routes /producaoEmbarcacaoEspecies
router.get('/', controller.getProducaoEmbarcacaoEspecies); // producaoEmbarcacaoEspecies
router.get('/:producaoEmbarcacaoEspecieId', controller.getProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId
router.post('/', controller.createProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies
router.put('/:producaoEmbarcacaoEspecieId', controller.updateProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId
router.delete('/:producaoEmbarcacaoEspecieId', controller.deleteProducaoEmbarcacaoEspecie); // /producaoEmbarcacaoEspecies/:producaoEmbarcacaoEspecieId

module.exports = router;