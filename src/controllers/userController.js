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
                    res.cookie('recordame', usuario.usr_email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 días o menos? preguntar gabi
                }

                return res.redirect('/');
            } else {
                return res.render('./users/login', { error: 'Correo electrónico o contraseña incorrectos.' });
            }
        } catch (error) {
            console.log(error);
            
        }
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
    


    
};
