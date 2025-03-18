const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");

//login
exports.loginUser = async (req, res) => {
  try {
      console.log(req.body); // Verifica qué datos llegan en la solicitud

      const { email, password } = req.body;

      // Validar que los campos no estén vacíos
      if (!email || !password) {
          return res.status(400).json({ error: "Email y contraseña son obligatorios." });
      }

      // Verificar si el usuario existe en la base de datos
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Usuario no encontrado." });
      }

      // Comparar la contraseña ingresada con la almacenada
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Contraseña incorrecta." });
      }

      // Crear token JWT
      const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET || 'secreto_super_seguro',
          { expiresIn: '2h' }
      );

      res.json({ message: "Inicio de sesión exitoso", token });

  } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error del servidor." });
  }
};

//register
exports.registrarUsuario = async (req, res) => {
  const { name, email, password, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crear usuario nuevo
    user = new User({
      name,
      email,
      password,
      rol: rol || "usuario", // Si no hay rol, se asigna 'usuario'
    });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar usuario en la BD
    await user.save();

    res.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.obtenerPerfil = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};