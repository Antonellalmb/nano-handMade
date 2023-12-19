/*const adminMiddleware = (req, res, next) => {
    console.log('Middleware de administradora');
  console.log('Usuario logueado:', req.session.usuarioLogeado);
    if (req.session.usuarioLogeado && req.session.usuarioLogeado.category_id === 1) {
      // El usuario es administrador, permitir acceso
      next();
    } else {
      res.redirect('/');
    }
  };
  
  module.exports = adminMiddleware;*/

  function adminMiddleware (req, res, next) {
    if (!req.session.usuarioLogeado || req.session.usuarioLogeado.category_id != "1") {
        return res.redirect('/');
    } 
    next();
    }
    

module.exports=adminMiddleware;
  