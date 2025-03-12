const Profesional = require('../models/Profesional');

exports.getProfesionales = async (req, res) => {
    try {
        const profesionales = await Profesional.getAll();
        res.json({ profesionales });
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
};