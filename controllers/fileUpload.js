const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
        }

        res.status(200).json({ message: "Upload realizado com sucesso!", file: req.file });
        console.log("Arquivo salvo em:", req.file.path);
    } catch (error) {
        res.status(500).json({ error: "Erro no upload do arquivo.", details: error.message });
    }
};

module.exports = { uploadFile };
