// server/src/routes/auth.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SALT_ROUNDS = 10;

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validaciones básicas
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }
    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // Crear usuario
    const newUser = await User.create({ username, email, passwordHash });
    // Respuesta (no enviamos el hash)
    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
  } catch (err) {
    console.error(err);
    // Manejo de errores de unicidad
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Usuario o correo ya registrado.' });
    }
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }
    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }
    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }
    // Generar JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

module.exports = router;