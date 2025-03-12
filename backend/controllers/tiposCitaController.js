const TipoCita = require('../models/TipoCita');

exports.getTiposCita = async (req, res) => {
    try {
        if (req.user.rol !== 'profesional') throw new Error('Unauthorized');
        const tipos = await TipoCita.getByProfesional(req.user.id);
        res.json(tipos);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.createTipoCita = async (req, res) => {
    try {
        const newTipo = await TipoCita.create(req.body, req.user.id);
        res.status(201).json(newTipo);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteTipoCita = async (req, res) => {
    try {
        await TipoCita.delete(req.params.id, req.user.id);
        res.json({ message: 'Appointment type deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};