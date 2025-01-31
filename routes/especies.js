const controller = require('../controllers/especies');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

// CRUD Routes /especies
router.get('/', verifyJWT, controller.getEspecies); // /especies
router.get('/:especieId', verifyJWT,  controller.getEspecie); // /especies/:especieId
router.post('/',verifyJWT,  controller.createEspecie); // /especies
router.put('/:especieId',verifyJWT,  controller.updateEspecie); // /especies/:especieId
router.delete('/:especieId', verifyJWT, controller.deleteEspecie); // /especies/:especieId

module.exports = router;