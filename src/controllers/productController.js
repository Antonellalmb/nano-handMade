const { isError } = require('util');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
//const { validationResult } = require("express-validator");

const Collections = db.Collection;
const Discounts = db.Discount;

module.exports = {
// *********************************    
// Product's Table  Controllers
// *********************************  
    products : (req, res) => {
        console.log("entraste a productos" );
        
        return res.render('./products/products');
    },


// *********************************    
// Collection's Table  Controllers
// *********************************    
    itemsCollections : async (req, res) => {
        console.log("entraste a collectionItemsTable" );
        try {
            const collectionItems = await Collections.findAll();
            return res.render('./products/collectionItemsTable' , {collectionItems : collectionItems});

        } catch (error) {
            console.log(error)
        };        
    },

    collections : (req, res) => {
        console.log("entraste a collectionsTable" );
        return res.render('./products/collectionsTable');
    },

    processCollections :  async (req, res) => {
        console.log("Entraste por post a processCollections");
        try {
            await Collections.create({
                name: req.body.collectionName,
                description: req.body.detail,
                discount_id: null
            })
            return res.redirect('/product/collectionsTable');
        } catch (error) {
            console.log(error);
        }
    },

    editItemCollection : async (req, res) => {
        console.log("Entraste por get a editItemCollection ----> id: ", req.params.id);
        try {
            const collectionItem = await Collections.findByPk(req.params.id);
            return res.render('./products/collectionItem' , {collectionItem : collectionItem})
        } catch (error) {
            console.log(error);
        }
    },

    updateItemCollection : async (req, res) => {
        console.log("Entraste por post a processEditItemCollection");
        console.log(req.body)

        
        try {
            await Collections.update({
                name: req.body.collectionName,
                description: req.body.detail,
                discount_id: null
            },{
                where: {
                    id: req.body.collectionId
                }
            })
            return res.redirect('/product/collectionItemsTable');
        } catch (error) {
            console.log(error);
        };
    },

    deleteItemCollection : async (req , res) => {
        console.log("Entraste de delete de item de colección: " , req.params.id);
        try {
            const deleteItemCollection = await Collections.findByPk(req.params.id);
            return res.render('./products/collectionItemDelete' , {deleteItemCollection : deleteItemCollection})
        } catch (error) {
            console.log(error)
        }
    },

    destroyItemCollection : async (req , res) => {
        console.log("Entraste a destroy de item de colecciones: " , req.params.id);
        try {
            await Collections.destroy({
                where: { id: req.params.id}
            })
            return res.redirect('/product/collectionItemsTable');
        } catch (error) {
            console.log(error);
        }
    },


// *********************************    
// Discount's Table  Controllers
// *********************************  
    itemsDiscounts : async (req, res) => {
        console.log("entraste a discountItemsTable" );
        try {
            const discountItems = await Discounts.findAll();
            return res.render('./products/discountItemsTable' , {discountItems : discountItems});

        } catch (error) {
            console.log(error)
        };        
    },

    discounts : (req, res) => {
        return res.render('./products/discountsTable')
    },

    processDiscounts :  async (req, res) => {
        console.log("Entraste por post a processDiscounts");
        try {
            await Discounts.create({
                discount_code: req.body.discountName,
                discount: req.body.discountPercentage
            })
            
        } catch (error) {
            console.log(error);
        }
    

        return res.redirect('/product/discountsTable')
    },

    editItemDiscount : async (req, res) => {
        console.log("Entraste por get a editItemDiscount ----> id: ", req.params.id);
        try {
            const discountItem = await Discounts.findByPk(req.params.id);
            return res.render('./products/discountItem' , {discountItem : discountItem})
        } catch (error) {
            console.log(error);
        }
    },

    updateItemDiscount : async (req, res) => {
        console.log("Entraste por post a processEditItemDiscount");
        try {
            await Discounts.update({
                discount_code: req.body.discountName,
                discount: req.body.detail,
            },{
                where: {
                    id: req.body.discountId
                }
            })
            return res.redirect('/product/discountItemsTable');
        } catch (error) {
            console.log(error);
        };
    },

    deleteItemDiscount : async (req , res) => {
        console.log("Entraste de delete de item de descuento: " , req.params.id);
        try {
            const deleteItemDiscount = await Discounts.findByPk(req.params.id);
            return res.render('./products/discountItemDelete' , {deleteItemDiscount : deleteItemDiscount})
        } catch (error) {
            console.log(error)
        }
    },

    destroyItemDiscount : async (req , res) => {
        console.log("Entraste a destroy de item de descuento: " , req.params.id);
        try {
            await Discounts.destroy({
                where: { id: req.params.id}
            })
            return res.redirect('/product/discountItemsTable');
        } catch (error) {
            console.log(error);
        }
    }


    
};
