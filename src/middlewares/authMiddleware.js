const authMiddleware = (req, res, next) => {
    if (req.session.usuarioLogeado) {
      // El usuario está logueado, permitir acceso
      next();
    } else {
      res.redirect('/user/login');
    }
  };
  
  module.exports = authMiddleware;
  