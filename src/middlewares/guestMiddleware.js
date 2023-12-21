function guestMiddleware(req, res, next) {
    //  este midd es para permitir acceso solo a rutas públicas si no hay un usuario logueado
    if (req.session.usuarioLogeado) {
        return res.redirect('/users/perfil');
    }
    next();
}


module.exports = guestMiddleware;


