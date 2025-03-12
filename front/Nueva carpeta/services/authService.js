const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, rut: user.rut, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

exports.authenticateUser = async (rut, password) => {
  const result = await pool.query(
    'SELECT id, rut, nombre, email, rol, password FROM usuarios WHERE rut = $1',
    [rut]
  );

  const user = result.rows[0];

  if (!user || user.password !== password) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken(user);
  const { id, nombre, email, rol } = user;
  return {
    token,
    user: { id, rut, nombre, email, rol }
  };
};