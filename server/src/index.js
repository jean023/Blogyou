require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

// Modelos (registrar con Sequelize antes de sync)
require('./models/User');
require('./models/Post');
require('./models/Comment');

// Rutas
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);

// Ruta raíz\ 
app.get('/', (req, res) => {
  res.send('¡Servidor Express y BD funcionando!');
});

// Conexión y sincronización de la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a MySQL'))
  .catch(err => console.error('❌ Error al conectar a MySQL:', err));

sequelize.sync()
  .then(() => console.log('✅ Modelos sincronizados'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log('API escuchando en http://localhost:${PORT}');
});
