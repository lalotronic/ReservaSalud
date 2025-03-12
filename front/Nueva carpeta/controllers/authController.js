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