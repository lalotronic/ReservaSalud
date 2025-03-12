const db = require('../config/database');

class TipoCita {
    static async getByProfesional(profesionalId) {
        const { rows } = await db.query(
            'SELECT * FROM tipo_cita WHERE profesional_id = $1',
            [profesionalId]
        );
        return rows;
    }

    static async create({ nombre, duracion }, profesionalId) {
        const { rows } = await db.query(
            'INSERT INTO tipo_cita (nombre, duracion, profesional_id) VALUES ($1, $2, $3) RETURNING *',
            [nombre, duracion, profesionalId]
        );
        return rows[0];
    }

    static async delete(id, profesionalId) {
        await db.query(
            'DELETE FROM tipo_cita WHERE id = $1 AND profesional_id = $2',
            [id, profesionalId]
        );
    }
}

module.exports = TipoCita;