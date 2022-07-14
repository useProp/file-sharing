const router = require('express').Router();
const fileController = require('../controllers/file.controller');
const checkPassword = require('../middlewares/checkPassword.middleware');

router.post('/:id', checkPassword, fileController.download);

module.exports = router;
