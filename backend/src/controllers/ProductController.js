const Producto = require ("../models/Product");

//crear un producto

exports.crearProducto = async(req,res) =>{
    try{
        const nuevoProducto = new Producto(req.body)
        await nuevoProducto.save()
        res.status(201).json(nuevoProducto)
    }catch(error){
        res.status(500).json({ mensaje: 'Error al crear el producto: ', error: error.message})
    }
};

// obtener todos los productos
exports.obtenerProductos = async (req, res) =>{
    try{
        const productosObtenidos = await Producto.find().populate('categoria')
        res.status(200).json(productosObtenidos)
    } catch(error){
        res.status(500).json({ mensaje: 'Error al obtener los productos ', error: error.message})
    }
};

// editar productos
exports.actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

// eliminar productos
exports.eliminarProducto = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
};