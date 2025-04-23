// server/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('¡Servidor Express y BD funcionando!');
});

// Conexión y sincronización
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a MySQL'))
  .catch(err => console.error('❌ Error al conectar a MySQL:', err));

sequelize.sync()
  .then(() => console.log('✅ Modelos sincronizados'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
