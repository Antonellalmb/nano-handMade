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

    collections : async (req, res) => {
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
            
        } catch (error) {
            console.log(error);
        }
    

        return res.redirect('/product/collectionsTable')
    },


// *********************************    
// Discount's Table  Controllers
// *********************************    
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



    
};
