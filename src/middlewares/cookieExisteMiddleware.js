
const db = require('../database/models');
const Users = db.User;

const cookieExiste = async (req, res, next) => {
    try {
        if (!req.session.usuarioLogeado && req.cookies.recordame) {
            const usuario = await Users.findOne({
                where: {
                    usr_email: req.cookies.recordame
                }
            });

            if (usuario) {
                delete usuario.usr_password;
                req.session.usuarioLogeado = usuario;
            }
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = cookieExiste;

// cookieExisteMiddleware.js
/*const db = require('../database/models');
const Users = db.User;

const cookieExiste = async (req, res, next) => {
    try {
        if (req.cookies.recordame) {
            const usuario = await Users.findOne({
                where: {
                    usr_email: req.cookies.recordame
                }
            });

            if (usuario) {
                // Eliminar la contraseña del usuario
                delete usuario.usr_password;

                // Asignar el usuario a la sesión solo si está autenticado
                req.session.usuarioLogeado = usuario;
            }
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = cookieExiste;*/
