const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
});

const upload = multer({storage: storage}).single('image');

const sizeImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    } else {
        try {
            const buffer = await sharp(req.file.path)
            .resize({width: 220, height: 360, fit: 'fill'})
            .jpeg({ quality: 80})
            .toBuffer();

            await sharp(buffer).toFile(`images/${req.file.filename}`);

            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
}

module.exports = {upload, sizeImage};