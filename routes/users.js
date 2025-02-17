const controller = require('../controllers/users');
const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')
const {
    validateUser,
    validateUserNoPassWord,
    validateUpdateStatusScheme,
    validateUpdateTypeScheme
} = require('../middlewares/inputValidator');



// CRUD Routes /users
router.get('/', verifyJWT, controller.getUsers); // /users
router.patch('/updatestatus/:userId', verifyJWT, validateUpdateStatusScheme, controller.updateUserStatus)
router.patch('/updatetype/:userId', verifyJWT, validateUpdateTypeScheme, controller.updateUserType)
router.get('/:userId', verifyJWT, controller.getUser); // /users/:userId
router.post('/', validateUser, controller.createUser); // /users
router.put('/:userId', verifyJWT, validateUser, controller.updateUser); // /users/:userId
router.patch('/:userId', verifyJWT, validateUserNoPassWord, controller.updateUserNoPassword); // /users/:userId
router.delete('/:userId', verifyJWT, controller.deleteUser); // /users/:userId
router.patch('/updatepassword/:userId', controller.updateUserPassword); // /users/reset-password


router.post('/reset-password', controller.resetPassword);

module.exports = router;