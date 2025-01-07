const controller = require('../controllers/especies');
const router = require('express').Router();

// CRUD Routes /especies
router.get('/', controller.getEspecies); // /especies
router.get('/:especieId', controller.getEspecie); // /especies/:especieId
router.post('/', controller.createEspecie); // /especies
router.put('/:especieId', controller.updateEspecie); // /especies/:especieId
router.delete('/:especieId', controller.deleteEspecie); // /especies/:especieId

module.exports = router;