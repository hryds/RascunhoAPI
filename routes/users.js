const controller = require('../controllers/users');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

// CRUD Routes /users
router.get('/', verifyJWT, controller.getUsers); // /users
router.patch('/updatestatus/:userId', verifyJWT, controller.updateUserStatus)
router.patch('/updatetype/:userId', verifyJWT, controller.updateUserType)
router.get('/:userId', verifyJWT, controller.getUser); // /users/:userId
router.post('/', controller.createUser); // /users
router.put('/:userId', verifyJWT, controller.updateUser); // /users/:userId
router.patch('/:userId', verifyJWT, controller.updateUserStatusNoPassword); // /users/:userId
router.delete('/:userId', verifyJWT, controller.deleteUser); // /users/:userId

module.exports = router;