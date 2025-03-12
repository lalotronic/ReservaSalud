const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, rut: user.rut, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

exports.authenticateUser = async (rut, password) => {
  const result = await pool.query(
    'SELECT id, rut, nombre, email, rol, password FROM usuario WHERE rut = $1',
    [rut]
  );

  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken(user);
  const { id, nombre, email, rol } = user;
  return {
    token,
    user: { id, rut, nombre, email, rol }
  };
};

exports.registerUser = async (rut, nombre, email, password, rol, especialidad_id, subespecialidad_id) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Verificar si el usuario ya existe
    const userExists = await client.query('SELECT * FROM usuario WHERE rut = $1', [rut]);
    if (userExists.rows.length > 0) {
      throw new Error('El usuario ya existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    let query, values;
    if (rol === 'paciente') {
      query = 'INSERT INTO usuario (rut, nombre, email, password, rol) VALUES ($1, $2, $3, $4, $5) RETURNING id, rut, nombre, email, rol';
      values = [rut, nombre, email, hashedPassword, rol];
    } else if (rol === 'profesional') {
      query = 'INSERT INTO usuario (rut, nombre, email, password, rol, especialidad_id, subespecialidad_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, rut, nombre, email, rol';
      values = [rut, nombre, email, hashedPassword, rol, especialidad_id, subespecialidad_id];
    } else {
      throw new Error('Rol no válido');
    }

    const result = await client.query(query, values);
    await client.query('COMMIT');

    const user = result.rows[0];
    const token = generateToken(user);

    return {
      token,
      user: { id: user.id, rut: user.rut, nombre: user.nombre, email: user.email, rol: user.rol }
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};