var express = require('express');
var router = express.Router();
var insertController= require('../controllers/insert_controller');
router.get('/', insertController.userForm);
router.get('/user-form', insertController.userForm);
router.post('/create', insertController.createData);
router.post('/delete', insertController.deleteData);
router.post('/update', insertController.updateData);
router.post('/readAll', insertController.readAll);
router.post('/uploadFile', insertController.uploadFile);

module.exports = router;
