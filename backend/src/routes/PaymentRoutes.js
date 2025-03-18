const express = require('express');
const router = express.Router();
const payment = require('../controllers/PaymentMethodController');

router.post('/', payment.addPaymentMethod);
router.get('/', payment.getUserPaymentMethods);
router.delete('/:id', payment.deletePaymentMethod);

module.exports = router;