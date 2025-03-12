const db = require('../config/database');

class Profesional {
    static async getAll() {
        const { rows } = await db.query(`
            SELECT 
                u.id,
                u.rut,
                u.nombre,
                e.nombre AS especialidad,
                s.nombre AS subespecialidad
            FROM usuario u
            INNER JOIN profesional p ON u.id = p.usuario_id
            INNER JOIN especialidad e ON p.especialidad_id = e.id
            LEFT JOIN subespecialidad s ON p.subespecialidad_id = s.id
            WHERE u.rol = 'profesional'
        `);
        return rows;
    }
}

module.exports = Profesional;