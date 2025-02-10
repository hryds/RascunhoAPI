const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT')

const multer = require('multer');
const { uploadFile } = require('../controllers/fileUpload');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const producaoId = req.body.producaoId || 'unknown';
        console.log(req.body.producaoId);
        cb(null, `${producaoId}-${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/', verifyJWT, upload.single("file"), (req, res, next) => {
    console.log(req.body.producaoId);
    next();
}, uploadFile);

module.exports = router;