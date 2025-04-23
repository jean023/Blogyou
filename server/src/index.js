 // src/index.js
 require('dotenv').config();
 const express = require('express');
 const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');
 const app = express();
 const PORT = process.env.PORT || 4000;

 app.use(cors());
 app.use(express.json());

 // Endpoint de prueba
 app.get('/', (req, res) => {
   res.send('¡Servidor Express y BD funcionando!');
 });

// Conectamos a la base de datos
sequelize.authenticate()
 .then(() => console.log('✅ Conectado a MySQL'))
  .catch(err => console.error('❌ Error al conectar a MySQL:', err));

// Sincronizamos los modelos
sequelize.sync()
  .then(() => console.log('✅ Modelos sincronizados'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

 app.listen(PORT, () => {
   console.log(`API escuchando en http://localhost:${PORT}`);
 });