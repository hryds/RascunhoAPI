const router = require('express').Router();
const multer = require('multer');
const { uploadFile } = require('../controllers/fileUpload');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.single("file"), uploadFile);

module.exports = router;