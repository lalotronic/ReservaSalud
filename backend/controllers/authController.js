const authService = require('../services/authService');

exports.login = async (req, res, next) => {
  try {
    const { rut, password } = req.body;
    const result = await authService.authenticateUser(rut, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { rut, nombre, email, password, rol, especialidad_id, subespecialidad_id } = req.body;
    const result = await authService.registerUser(rut, nombre, email, password, rol, especialidad_id, subespecialidad_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
