const db = require('../../database/models')
const sequelize = db.sequelize;

const Users = db.User;
const Products = db.Product;

module.exports = {
    login: (req, res) => {
        return res.render('login')
    },

    loginProcess:async(req, res) => {
        try {
            const [usuarios , productos] = await Promise.all([Users.findAll(), Products.findAll()])
            console.log(usuarios);
            console.log(productos);
    /*        const usuarios = await Users.findAll()
            console.log(usuarios); 
            const productos = await Products.findAll()
            console.log(productos);
    */
        } catch (error) {
           console.log(error) 
        }

        console.log("Ingresaste Datos Login ")
        console.log("Minuto 48 clase 32")

        
        return res.render('login')
    },

    register: (req, res) => {
        return res.render('register')
    }


    
};
