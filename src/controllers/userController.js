const db = require('../database/models')
const sequelize = db.sequelize;

const Users = db.User;


module.exports = {

    login: (req, res) => {

        return res.render('./users/login')

    },

    loginProcess: async (req, res) => {
        console.log('entraste a login process')
        try {
            console.log(req.body.email)
            const usuario = await Users.findOne({
                where: {
                    usr_email: req.body.email,
                    
                }
            });
            console.log(usuario)

            if (usuario) {
                delete usuario.usr_password;
                req.session.usuarioLogeado = usuario;

                if (req.body.cookie) {
                    res.cookie('recordame', usuario.usr_email, { maxAge: 1000*60*60 });
                }

                return res.redirect('/');
            } else {
                return res.render('./users/login', { error: 'Correo electrónico o contraseña incorrectos.' });
            }
        } catch (error) {
            console.log(error);
            
        }
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('recordame');
            res.redirect('/');
        });
    },

    register: (req, res) => {

        return res.render('./users/register')
    },

    processRegister: async(req, res) => {
        console.log('entraste a proceso de registro')
        console.log(req.body)
        try {
            await Users.create({
                'usr_email': req.body.email,
                'usr_password':req.body.password,
                'usr_name': req.body.name,
                'usr_address': req.body.address,
                'category_id': parseInt(req.body.rol)
            })
            
            return res.redirect('/user/login')

        } catch (error) {
            console.log(error)
        }

    },

    perfil: (req, res) => {
        if (res.locals.isLogged) {
            res.render('./users/perfil', { usuario: res.locals.userLogged });
        } else {
            res.redirect('/user/login');
        }
    },

    editarPerfil: (req, res) => {
        if (res.locals.isLogged) {
            res.render('./users/editarPerfil', { usuario: res.locals.userLogged });
        } else {
            res.redirect('/user/login');
        }
    },


    processEditarPerfil: async (req, res) => {
        try {
            if (res.locals.isLogged) {
                const usuarioId = res.locals.userLogged.id;
            
                // con desestructuring extraigo los  datos del formulario----del req.body
                const { email, contrasenia, address } = req.body;

                // cree un objeto con los campos que quieres actualizar
                const datosActualizados = {
                    usr_email: email,
                    usr_password: contrasenia,
                    usr_address: address
                   
        };

            //  con este update actualizo el perfil en la base de datos
            await Users.update(datosActualizados, { where: { id: usuarioId } });

            res.redirect('/user/perfil');
        } else {
            res.redirect('/user/login');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/user/editarPerfil');//si hay error que me lleve de nuevo a editar perfil
    }
},


    eliminarPerfil: async (req, res) => {
        if (res.locals.isLogged) {
            try {
                
                const usuarioId = res.locals.userLogged.id;
                await Users.destroy({ where: { id: usuarioId } });

                
                req.session.destroy(() => {
                    res.clearCookie('recordame');
                    res.redirect('/');
                });
            } catch (error) {
                console.log(error);
                res.redirect('/user/perfil');
            }
        } else {
            res.redirect('/user/login');
        }
    },
    

    
};
