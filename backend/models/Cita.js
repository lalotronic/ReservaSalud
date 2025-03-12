const db = require('../config/database');

class Cita {
    static async getByUser(userId) {
        const { rows } = await db.query(
            'SELECT * FROM cita WHERE paciente_id = $1',
            [userId]
        );
        return rows;
    }

    static async create(disponibilidadId, pacienteId) {
        await db.query('BEGIN');
        const disponibilidad = await db.query('SELECT * FROM disponibilidad WHERE id = $1 FOR UPDATE', [disponibilidadId]);

        if (disponibilidad.rows[0].estado !== 'disponible') {
            await db.query('ROLLBACK');
            throw new Error('Slot ya reservado');
        }

        const { rows } = await db.query(
            'INSERT INTO cita (paciente_id, disponibilidad_id, fecha_hora) VALUES ($1, $2, $3) RETURNING *',
            [pacienteId, disponibilidadId, disponibilidad.rows[0].fecha_hora]
        );

        await db.query('UPDATE disponibilidad SET estado = $1 WHERE id = $2', ['reservado', disponibilidadId]);
        await db.query('COMMIT');
        return rows[0];
    }
}

module.exports = Cita;