const Usuario = require('../models/Usuario');

exports.getUsuarioByRut = async (req, res) => {
    try {
        const usuario = await Usuario.getByRut(req.params.rut);
        if (!usuario) return res.status(404).json({ error: 'User not found' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};