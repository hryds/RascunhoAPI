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


const allowedMimeTypes = [
    'application/pdf', // PDF
    'application/msword', // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'image/png', // PNG
    'application/vnd.oasis.opendocument.text', // ODT
    'image/jpeg', // JPG
    'application/xml', // XML
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
];

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); 
        } else {
            cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PNG, ODT, JPG, XML, and XLSX are allowed.'), false); 
        }
    }
});


router.post('/',verifyJWT, upload.single("file"), (req, res, next) => {
    console.log(req.body.producaoId);
    next();
}, uploadFile);

module.exports = router;