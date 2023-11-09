const db = require('../database/models');
const Category = require('../database/models/Category');
const sequelize = db.sequelize;

const Users = db.User;
const Products = db.Product;
const Colors = db.Color;
const Collections = db.Collection;
const Sizes = db.Size;
const Photos = db.Photo;
const Categories = db. Category;
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
        return res.render('./users/register')
    },

    categories: async(req, res) => {
        console.log('entrando a categorias de usuario');
        const roles = await Category.findAll();
        console.log(roles)
        return res.render('./user/userCategory')
    },

    rates: async(req, res) => {
        try {
            const [categories, taxes] = await Promise.all([Categories.findAll(),Taxes.findAll()])
            console.log(categories);
            console.log(taxes);
            
        } catch (error) {
            console.log(error)
            
        }
    return res.render('userTaxes')
    
    }

    
};
