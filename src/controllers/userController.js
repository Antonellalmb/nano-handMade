const db = require('../database/models')
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const Users = db.User;
const Category = db.Category;


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
                  

                if (req.body.cookie) {
                    res.cookie('recordame', usuario.usr_email, { maxAge: 1000*60*60*72 });
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

                // Con desestructuración extraigo los datos del formulario
                const { email, contrasenia, address } = req.body;

               /* // Creo un objeto con los campos que voy a actualizar
                const datosActualizados = {
                    usr_email: email,
                    usr_password: contrasenia,
                    usr_address: address
                };*/

                // Si se cambia la contraseña, hashearla
                let hashedPassword = null;
                if (contrasenia) {
                hashedPassword = await bcrypt.hash(contrasenia, 10);
                }

                 // Creo un objeto con los campos que voy a actualizar
                const datosActualizados = {
                    usr_email: email,
                    usr_password: hashedPassword, // null si no se proporciona una nueva contraseña
                    usr_address: address
                };

                // Con este update actualiza el perfil en la base de datos
                await Users.update(datosActualizados, { where: { id: usuarioId } });

                const usuario = await Users.findOne({
                    where: {
                        usr_email: datosActualizados.usr_email
                        
                    }
                });
                console.log(usuario)
    

                delete usuario.usr_password;// borro la contraseña para guardarlo en la session
                req.session.usuarioLogeado = usuario;
                
                res.redirect('/');
            } else {
                res.redirect('/user/perfil');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/user/editarPerfil');
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

    adminUsers: async (req, res) => {
        try {
          const users = await Users.findAll({
            include: [{ model: Category, as: 'userCategory' }],
          });
      
          res.render('./users/adminUsers', { users });
        } catch (error) {
          console.log(error);
          res.redirect('/');
        }
    },

    editUser: async (req, res) => {
        console.log("Entraste por get a editUser ----> id: ", req.params.id)
        const userId = req.params.id;
        try {
            const [user , categorias] = await Promise.all([Users.findByPk(userId) , Category.findAll()]);

    //        return res.send(categorias)

          res.render('users/editUser', {user : user , categorias : categorias});
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
    },

    updateUser : async (req, res) => {
        console.log("Entraste por post a updateUser ----> id: ", req.params.id);
        console.log(req.body)
        
        try {
            const user = await Users.findByPk(req.body.id);
            console.log(user)
            await Users.update({
                usr_email: user.usr_email,
                usr_password: user.usr_password,
                usr_name: user.usr_name,
                usr_address: user.usr_address,
                tax_id: user.tax_id,
                usr_tax_number: user.usr_tax_number,
                category_id: req.body.rolSelected,
            },{
                where: {
                    id: req.body.id
                }
            })
            return res.redirect('/user/adminUsers');
        } catch (error) {
            console.log(error);
        };
    },
    

    obtenerCategorias: async (req, res) => {
        try {
          const categorias = await db.Category.findAll();
          res.render('users/categorias', { categorias });

        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
    },
    
    editarCategoria: async (req, res) => {
        const categoriaId = req.params.id;
        try {
          const categoria = await db.Category.findByPk(categoriaId);
          res.render('users/editarCategoria', { categoria });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
    },
    
      guardarEdicionCategoria: async (req, res) => {
        const categoriaId = req.body.categoriaIdEditar;
        const nuevaCategoria = req.body.nuevaCategoria;
        try {
          await db.Category.update({ roles: nuevaCategoria }, { where: { id: categoriaId } });
          res.redirect('/user/categorias');
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
    },
    
      agregarCategoria: async (req, res) => {
        const nuevaCategoria = req.body.nuevaCategoria;
        try {
          await db.Category.create({ roles: nuevaCategoria });
          res.redirect('/user/categorias');
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
    },

    eliminarCategoria: async (req, res) => {
        const categoriaId = req.params.id;
        try {
          await db.Category.destroy({ where: { id: categoriaId } });
          res.redirect('/user/categorias');
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
    }
}; 


    
    

    

