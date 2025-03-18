const express = require('express');
const router = express.Router();
const controladorCategoria = require('../controllers/CategoryController');
const auth = require('../middlewares/Auth');
const roleCheck = require('../middlewares/roleCheck');

router.post('/', [auth, roleCheck(['admin', 'supplier'])], controladorCategoria.crearCategoria);
router.get('/', [auth, roleCheck(['admin', 'supplier'])], controladorCategoria.obtenerCategorias);
router.put('/:id',[auth, roleCheck(['admin', 'supplier'])], controladorCategoria.actualizarCategoria);
router.delete('/:id', [auth, roleCheck(['admin', 'supplier'])], controladorCategoria.eliminarCategoria);

module.exports = router;