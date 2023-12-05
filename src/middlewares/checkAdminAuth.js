
/*
const checkAdminAuth = (req, res, next) => {
    // Verifica si el usuario está autenticado y es un administrador
    if (res.locals.isLogged && res.locals.userLogged && res.locals.userLogged.userCategory) {
        const userRoles = res.locals.userLogged.userCategory.roles;
        
        if (userRoles === 'admin' || userRoles === 'administrador') {
            next(); // El usuario es un administrador, permite el acceso
        } else {
            res.redirect('/'); // Redirige al usuario no autorizado a otra página
        }
    }
};

module.exports = checkAdminAuth;

*/