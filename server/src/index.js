// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});