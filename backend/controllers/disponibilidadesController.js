const Disponibilidad = require('../models/Disponibilidad');

exports.getDisponibilidades = async (req, res) => {
    try {
        const disponibilidades = await Disponibilidad.getByProfesional(req.query.profesional_id);
        res.json(disponibilidades);
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
};

exports.createDisponibilidad = async (req, res) => {
    try {
        const newSlot = await Disponibilidad.create(req.body, req.user.id);
        res.status(201).json(newSlot);
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
};

exports.updateDisponibilidad = async (req, res) => {
    try {
        const updatedSlot = await Disponibilidad.update(req.body, req.user.id);
        res.json(updatedSlot);
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
};