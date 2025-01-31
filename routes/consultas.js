const controller = require('../controllers/consultas');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

//CRUD routes/consultas

router.get('/:userId', verifyJWT, controller.getAllProducaoByUserId); // consultas/userId


module.exports = router;