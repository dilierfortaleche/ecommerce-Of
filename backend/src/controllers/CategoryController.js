const Categoria = require('../models/Category');

//crear categoria
exports.crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la categoría', error: error.message });
    }
};

//obtener todas las categorias
exports.obtenerCategorias = async (req, res) => {
    try {
        const categoriasObtenidas = await Categoria.find();
        res.status(200).json(categoriasObtenidas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las categorías', error: error.message });
    }
};

//editar categorias
exports.actualizarCategoria = async (req, res) => {
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la categoría', error: error.message });
    }
};

//eliminar categorias
exports.eliminarCategoria = async (req, res) => {
    try {
        await Categoria.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoría', error: error.message });
    }
};