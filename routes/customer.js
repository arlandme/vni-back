var express = require('express');
var router = express.Router();
var CustomerController = require('../controllers/CustomerController');
var verifyToken = require('../middleware/verifyToken');

/* GET users listing. */
router.get('/getById/:_id', CustomerController.getById);
router.get('/getByPath/:path', CustomerController.getByPath);
router.post('/search', CustomerController.search);
router.post('/create', verifyToken, CustomerController.create);
router.post('/delete', verifyToken, CustomerController.delete);
router.post('/update', verifyToken, CustomerController.update);

module.exports = router;
