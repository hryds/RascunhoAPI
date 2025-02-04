const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);
router.get('/', authController.verifyID);

module.exports = router;