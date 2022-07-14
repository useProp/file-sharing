const router = require('express').Router();
const uploadRouter = require('./upoad.router');
const fileRouter = require('./file.router');

router.use('/upload', uploadRouter);
router.use('/file', fileRouter);

module.exports = router;
