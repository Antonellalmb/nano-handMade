const db = require('../database/models');
const Users = db.User;
const sequelize = db.sequelize;
const { check } = require('express-validator');
const { validationResult } = require("express-validator");

console.log('entrando a reglas de validacion')
const reglasValidacion = [
    check('name').notEmpty().isLength({ min:4 }).withMessage('O nome é obrigatório'),
    check('email').notEmpty().withMessage('Completar email').isEmail().withMessage('Email inválido').custom(async (value) => {
        const existingUser = await Users.findOne({ where: { usr_email: value }});
        if (existingUser) {
          throw new Error('Este email ya está registrado');
        }
        return true;
      }),

    check('contrasenia').notEmpty().withMessage('tem que preencher este campo').isStrongPassword
    ({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage
    ('A senha deve ter no mínimo 8 caracteres, no mínimo 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial'),
    check('confirm-contrasenia').custom((value, { req }) => {
        if (value !== req.body.contrasenia) {
            throw new Error('As senhas não coincidem');
        }
        console.log('validando contraseñas')
        return true;
    }),
    check('address').notEmpty().withMessage('O endereço é obrigatório')//lo pongo para probar...despues sacar, o no----verrr
];

const validateRegister = (req, res, next) => {
    console.log('errores de validacion midd')
    const errors = validationResult(req);//validationResult es una funcion de express-validator ve si hay errores en el request(req)

    if (!errors.isEmpty()) {

        const formattedErrors = errors.array().reduce((acc, error) => {   //devuelve un array de objetos, donde cada objeto representa un error de validación. 
            
            acc[error.param] = error.msg;                                  // reduce se utiliza para transformar este array en un objeto más fácil de manejar.
                                                                            //acc es el acumulador que se irá construyendo durante el proceso de reducción.
                                                                            //error.param es el nombre del campo en el formulario que causó el error.
        return acc;                                                         //error.msg es el mensaje de error asociado con ese campo.
                                                                            //En cada iteración, se agrega una entrada al objeto acc donde la clave es el nombre del campo y el valor es el mensaje de error.
    }, {});  //objeto vacio valor inicial del acumulador

        res.locals.errors = formattedErrors;
        console.log('hay errores de validacion?')
        return res.render('./users/register', { errors: formattedErrors });
    }
    console.log('antes de next')
    next();
    console.log('despues de next')
};


module.exports = {
    reglasValidacion,
    validateRegister
};
