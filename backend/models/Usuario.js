const db = require('../config/database');

class Usuario {
    static async getByRut(rut) {
        const { rows } = await db.query(
            'SELECT id, rut, email, nombre, rol FROM usuario WHERE rut = $1',
            [rut]
        );
        return rows[0];
    }
}

module.exports = Usuario;