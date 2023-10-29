const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/multer-config');
const { sizeImage } = require('../middleware/multer-config');





router.post('/', auth, upload,sizeImage, bookCtrl.createBook);
router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.bestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, upload, sizeImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);





module.exports = router;