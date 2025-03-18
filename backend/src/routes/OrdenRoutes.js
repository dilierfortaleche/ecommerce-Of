const express = require('express');
const router = express.Router();
const Orden = require('../controllers/OrderController');
const auth = require('../middlewares/Auth');
const roleCheck = require('../middlewares/roleCheck');

router.post('/', [auth, roleCheck(['admin', 'supplier'])], Orden.createOrder);
router.get('/', [auth, roleCheck(['admin', 'supplier'])], Orden.getOrdersByUser);
router.put('/:id', [auth, roleCheck(['admin', 'supplier'])], Orden.updateOrderStatus);

module.exports = router;