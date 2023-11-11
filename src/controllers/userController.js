const db = require('../database/models');
const sequelize = db.sequelize;

const Users = db.User;
const Products = db.Product;
const Colors = db.Color;
const Collections = db.Collection;
const Sizes = db.Size;
const Photos = db.Photo;
const Categories = db.Category;
const Taxes = db.Tax;

module.exports = {
    login: (req, res) => {
        return res.render('./users/login')
    },

    loginProcess:async(req, res) => {
        try {
            const [users , products , colors , collections , sizes , photos] = await Promise.all([Users.findAll(), Products.findAll({include:[{association: 'productCollection'} , {association: 'productPhoto'}]}), Colors.findAll(), Collections.findAll({include:[{association: 'collectionProduct'}]}), Sizes.findAll(), Photos.findAll({include:[{association: 'photoProduct'}]})])
            console.log(users);
            console.log(products);
            console.log(colors);
            console.log(collections);
            console.log(sizes);
            console.log(photos);
            res.send(products)
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
        return res.render('./users/register');
    },

    categories:(req, res) => {
        console.log('entrando a categorias de usuario');

        return res.render('./users/userCategory');
    },
    tablaUser:(req, res) => {
        console.log('entraste por tablas de usuario');
    },
    cambiarRol:(req, res) => {
        console.log('entraste a cambiar roles de usuario');
    },

    processCategory:async(req, res) => {
        console.log('entraste a process category');
        console.log(req.body.categoria)

        try {
            await Categories.create({
                roles: req.body.categoria 
            })

        return res.render('./users/userCategory');

        } catch (error) {
            console.log(error)
        }

    },

    userTax:(req, res) => {
        console.log('entrando a categoria de impuestos');

        return res.render('./users/userTaxes');
    },

    taxes: async(req, res) => {
        console.log('entraste a impuestos');
     
        try {
            await Taxes.create({
                type: req.body.tipo,
                percent:req.body.porcentaje
            })

        return res.render('./users/userCategory');

        } catch (error) {
            console.log(error)
        }
        

    },

};
