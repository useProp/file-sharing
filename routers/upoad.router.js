const router = require('express').Router();
const uploadController = require('../controllers/upload.controller');
const multer = require('../middlewares/multer.middleware');

router.get('/', uploadController.getForm);
router.post('/', multer.single('file'), uploadController.upload)

module.exports = router;
