const controller = require('../controllers/users');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

// CRUD Routes /users
router.get('/', controller.getUsers); // /users
router.patch('/updatestatus/:userId', controller.updateUserStatus)
router.get('/:userId', controller.getUser); // /users/:userId
router.post('/', controller.createUser); // /users
router.put('/:userId', controller.updateUser); // /users/:userId
router.delete('/:userId', verifyJWT, controller.deleteUser); // /users/:userId

module.exports = router;