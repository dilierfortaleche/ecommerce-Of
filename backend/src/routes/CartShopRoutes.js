const express = require('express');
const router = express.Router();
const CartShop = require('../controllers/CartShopController');
const auth = require('../middlewares/Auth');
const roleCheck = require('../middlewares/roleCheck');

router.post('/', CartShop.addToCart);
router.get('/', CartShop.getCart);
router.delete('/:id', [auth, roleCheck(['admin', 'supplier'])], CartShop.removeFromCart);
router.delete('/', CartShop.clearCart)

module.exports = router;