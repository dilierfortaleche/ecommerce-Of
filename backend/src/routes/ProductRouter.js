const express = require('express');
const router = express.Router();
const controllerProduct = require('../controllers/ProductController');
const auth = require('../middlewares/Auth');
const roleCheck = require('../middlewares/roleCheck');

router.post('/', [auth, roleCheck(['admin', 'supplier'])], controllerProduct.crearProducto);
router.get('/', [auth, roleCheck(['admin', 'supplier'])], controllerProduct.obtenerProductos);
router.put("/:id", [auth, roleCheck(['admin', 'supplier'])], controllerProduct.actualizarProducto)
router.delete('/:id', [auth, roleCheck(['admin', 'supplier'])], controllerProduct.eliminarProducto);

module.exports = router;