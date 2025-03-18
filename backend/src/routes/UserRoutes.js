const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');
const roleCheck = require('../middlewares/roleCheck');
const userController = require('../controllers/userController');

//login
router.post('/login', [auth, roleCheck(['user'])], userController.loginUser);

// Registrar usuario (Público)
router.post('/register', [auth, roleCheck(['user'])], userController.registrarUsuario);

// Obtener todos los usuarios (Solo administrador)
router.get('/', [auth, roleCheck(['admin'])], userController.obtenerUsuarios);

// Eliminar usuario (Solo administrador)
router.delete('/:id', [auth, roleCheck(['admin'])], userController.eliminarUsuario);



module.exports = router;
