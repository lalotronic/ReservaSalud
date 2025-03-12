const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importación de rutas
const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const tiposCitaRoutes = require('./routes/tiposCitaRoutes');
const disponibilidadesRoutes = require('./routes/disponibilidadesRoutes');
const citasRoutes = require('./routes/citasRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes')

const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 4000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Configuración de rutas
app.use('/api/auth', authRoutes);          // Autenticación
app.use('/api/usuarios', usuariosRoutes);  // Gestión de usuarios
app.use('/api/tipos-cita', tiposCitaRoutes); // Tipos de citas
app.use('/api/disponibilidades', disponibilidadesRoutes); // Disponibilidades
app.use('/api/citas', citasRoutes);        // Citas
app.use('/api/profesionales', profesionalRoutes);  //Profesionales

// Manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});