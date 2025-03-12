const Cita = require('../models/Cita');

exports.getCitas = async (req, res) => {
    try {
        const citas = await Cita.getByUser(req.user?.id || req.query.rut);
        res.json(citas);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createCita = async (req, res) => {
    try {
        const newCita = await Cita.create(req.body.disponibilidad_id, req.user.id);
        res.status(201).json(newCita);
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
};