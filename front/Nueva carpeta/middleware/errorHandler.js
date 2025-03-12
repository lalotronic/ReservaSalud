module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.message === 'Credenciales inválidas') {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  
    res.status(500).json({ message: 'Error interno del servidor' });
  };