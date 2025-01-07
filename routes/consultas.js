const controller = require('../controllers/consultas');
const router = require('express').Router();

//CRUD routes/consultas

router.get('/:userId', controller.getAllProducaoByUserId); // consultas/userId


module.exports = router;