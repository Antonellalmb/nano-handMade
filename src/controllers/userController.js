const db = require('../database/models')
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const Users = db.User;


module.exports = {

    login: (req, res) => {
        console.log('entraste a login');
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

            if (usuario) { //si encuentro el usuarioi
                delete usuario.usr_password;// borro la contraseña para guardarlo en la session
                req.session.usuarioLogeado = usuario; //y almaceno al usuario en la session

                if (req.body.cookie) {//si dio checkk en recordame se hace la cookie
                    res.cookie('recordame', usuario.usr_email, { maxAge: 1000*60*60 });
                }

                return res.redirect('/');
            }else{
                console.log('error datos')
                return res.render('./users/login', {
                    errors: {
                        datosMal: {
                            msg: "Datos Incorrectos"
                        }
                    }
                })
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
        console.log('entraste a registro')
        return res.render('./users/register')
    },

    processRegister: async (req, res) => {
        console.log('entraste a proceso de registro');
        console.log(req.body);

        
            // acá validando los  campos usando express-validator
            const resultErrors = validationResult(req);
            console.log('errores de validacion')

            if (resultErrors.errors.length > 0) {
                return res.render('./users/register', { errors: resultErrors.array(), oldData: req.body });
            }

            console.log('entraste por creacion de usuario con seña hasheada')
            console.log(req.body.name)
            // Hash de la contraseña antes de guardarla en la base de datos en la base de datos

            try {
                console.log('antes de crear usuario')
                const hashedPassword = await bcrypt.hash(req.body.contrasenia, 10); // esta parte es para poner la sal
                console.log('se crea usuario?')
                // acá creo el usuario con la contraseña hasheada
                await Users.create({
                    'usr_email': req.body.email,
                    'usr_password': hashedPassword,
                    'usr_name': req.body.name,
                    'usr_address': req.body.address,
                    'category_id': parseInt(req.body.rol)
                });
                console.log('usuario creado')
                return res.redirect('login');
                

            } catch (error) {
                console.error(error);
                console.log('error datos')
                return res.render('./users/login', {
                    errors: {
                        datosMal: {
                            msg: "Datos Incorrectos"
                        }
                    }
                })
                //return res.redirect('/user/register');
               // res.locals.errorMessage = 'Error al crear usuario. Por favor, intenta nuevamente.';
                /*return res.render('./users/register', { errors: res.locals.errors, oldData: req.body });
                //solo para ver donde esta el mierda de error*/
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
