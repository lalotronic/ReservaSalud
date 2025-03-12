const db = require('../config/database');

class Disponibilidad {
    static async getByProfesional(profesionalId) {
        const { rows } = await db.query(`
            SELECT d.*, tc.duracion 
            FROM disponibilidad d
            INNER JOIN tipo_cita tc ON d.tipo_cita_id = tc.id
            WHERE d.profesional_id = $1 AND d.estado = 'disponible'
        `, [profesionalId]);
        return rows;
    }

    static async create({ fecha_hora, tipo_cita_id }, profesionalId) {
        const { rows } = await db.query(
            'INSERT INTO disponibilidad (profesional_id, fecha_hora, tipo_cita_id, estado) VALUES ($1, $2, $3, $4) RETURNING *',
            [profesionalId, fecha_hora, tipo_cita_id, 'disponible']
        );
        return rows[0];
    }

    static async update({ id, fecha_hora, tipo_cita_id, estado }, profesionalId) {
        const { rows } = await db.query(
            'UPDATE disponibilidad SET fecha_hora = $1, tipo_cita_id = $2, estado = $3 WHERE id = $4 AND profesional_id = $5 RETURNING *',
            [fecha_hora, tipo_cita_id, estado, id, profesionalId]
        );
        return rows[0];
    }
}

module.exports = Disponibilidad;