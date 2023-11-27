const { isError } = require('util');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const { isStringObject } = require('util/types');
//const { validationResult } = require("express-validator");

const Products = db.Product;
const Collections = db.Collection;
const Discounts = db.Discount;
const Colors = db.Color;
const Sizes = db.Size;
const Characteristics = db.Characteristic;

module.exports = {
// *********************************    
// Products views  Controllers
// *********************************  
    products : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productTable = await Products.findAll(
                {include:[
                    {association: 'productCollection'} , 
                    {association: 'productPhoto'}
                ]}
            )
        //        return res.send(productTable)
            return res.render('./products/products' , { productTable : productTable});
        } catch (error) {
            console.log(error)
        }
    },

// *********************************    
// Product's Table  Controllers
// ********************************* 
    itemsProducts : async (req, res) => {
        console.log("entraste a productItemsTable" );
        try {
            const productItems = await Products.findAll(
                {include:[{association: 'productCollection'} , {association: 'productPhoto'} , {association: 'productDiscount'} , {
                    model: Characteristics,
                    //as: 'productCharacteristic',
                    attributes: ['stock', 'price', 'details'],
                    include: [
                        {
                            model: Colors,
                            //as: 'color',
                            attributes: ['name', 'description']
                        },
                        {
                            model: Sizes,
                            //as: 'size',
                            attributes: ['name', 'description']
                        }
                    ]
                }
                ]}
            );
    //    return res.send(productItems)
            return res.render('./products/productItemsTable' , {productItems : productItems});
        } catch (error) {
            console.log(error)
        };        
    },

    productsItem : async(req, res) => {
        console.log("entraste a productsTable" );
        try {
            const [discounts , collections , colors , sizes] = await Promise.all([Discounts.findAll() , Collections.findAll() , Colors.findAll() , Sizes.findAll()]);
            return res.render('./products/productsTable' , {discounts : discounts , collections : collections , colors : colors , sizes : sizes});
        } catch (error) {
            console.log(error);
        }
    },

    processProductsItem : async (req, res) => {
        console.log("Entraste por post a processProductsItem");
        try {
        //    console.log(req.body);
            // ********************************************************************
            // Para el Producto cargado, se crea el array con las combinaciones de 
            // Precio, Color , Tamaño, Stock , Descuento y Detalles para llenar la
            // tabla pivot de caracteristicas.
            // ********************************************************************
            let combinations = [];
            for (i = 0 ; i < req.body.productPrice.length ; i++) {
                if (req.body.productPrice[i] != '') {
                    combinations.push({
                        price: req.body.productPrice[i],
                        color_id: req.body.colorSelected[i],
                        size_id: req.body.sizeSelected[i],
                        stock: req.body.productStock[i],
                        discount_id: req.body.discountSelected[i],
                        details: req.body.productDetail[i]
                    })
                }
            }
            // ********************************************************************
        /*    console.log(combinations);
            console.log(req.body.productName);
            console.log(req.body.detail);
            console.log(req.body.collectionSelected);
            console.log(req.body.discountSelectedItem);
            console.log(req.body.colorSelected);
            console.log(req.body.sizeSelected);
            console.log(req.body.productPrice);
            console.log(req.body.productDetail);
            console.log(req.body.productStock);
            console.log(req.body.discountSelected)
        */
            //************************************************************************** 
            // Si de la vista llega el campo de descuento vacío no se ejecuta el create
            //************************************************************************** 
            if (!req.body.discountSelected) {
                return res.redirect('/product/productsTable')
            }
            //**************************************************************************
            const productCreated = await Products.create({
                name: req.body.productName,
                description: req.body.detail,
                collection_id: req.body.collectionSelected,
                discount_id: req.body.discountSelectedItem
            });
        //    console.log(productCreated);
        for (const combination of combinations) {
            // **************************************************************************
            // Acá cargamos la tabla pivot caracteristicas con el array "combinations" 
            // **************************************************************************
    /*        console.log(combination)
            console.log(parseInt(combination.color_id))
            console.log(parseInt(combination.size_id))
            console.log(combination.stock)
            console.log(combination.price)
            console.log(combination.details)
            console.log(parseInt(combination.discount_id))
    */
            const characteristic = await Characteristics.create({
                product_id: productCreated.id,
                color_id: parseInt(combination.color_id),
                size_id: parseInt(combination.size_id),
                stock: combination.stock,
                price: combination.price,
                details: combination.details,
                discount_id: parseInt(combination.discount_id)
            });
            // *******************************************************************************
            // Usa addCharacteristic para agregar cada combinación. Así le pasamos a products  
            // la asociación con las tablas colors y sizes por medio de characteristics.
            // *******************************************************************************
            await productCreated.addCharacteristic(characteristic);
            // *******************************************************************************
        };
            return res.redirect('/product/productsTable');
            // return res.redirect('/product/collectionItemsTable');
        } catch (error) {
            console.log(error);
            return res.status(500).send("Error al procesar el producto");
        }
    },

    editItemProduct : async (req, res) => {
        console.log("Entraste por get a editItemProduct ----> id: ", req.params.id);
        try {
            const [productItem , collections , discounts , colors , sizes]= await Promise.all([
                Products.findByPk(req.params.id , {
                    include:[
                        {association: 'productCollection'} , 
                        {association: 'productPhoto'} , 
                        {association: 'productDiscount'} , 
                        {
                            model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'color_id', 'size_id','discount_id'],
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['discount_code' , 'discount']
                                },
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                }
                            ]
                        }
                    ]
            }),
                Collections.findAll(),
                Discounts.findAll(),
                Colors.findAll(), 
                Sizes.findAll()
            ]) 
            
    //        return res.send(productItem)
    //        return res.send(collections)
    //        return res.send(discounts)

            return res.render('./products/productItem' , {productItem : productItem , collections : collections , discounts : discounts , colors : colors , sizes : sizes})
        } catch (error) {
            console.log(error);
        }
    },

    updateItemProduct : async (req, res) => {
        console.log("Entraste por post a updateItemProduct");
        try {
        /*    console.log(req.body)
            console.log((parseFloat(req.body.productPrice)))
            console.log(isNaN(parseFloat(req.body.productPrice)))
            console.log(Array.isArray(req.body.productPrice))
            console.log(" ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        */
             // ********************************************************************
            // Para el Producto cargado, se crea el array con las combinaciones de 
            // Precio, Color , Tamaño, Stock , Descuento y Detalles para llenar la
            // tabla pivot de caracteristicas.
            // ********************************************************************
            let combinations = [];
            if(Array.isArray(req.body.productPrice)) {
                for (i = 0 ; i < req.body.productPrice.length ; i++) {
                    if (req.body.productPrice[i] != '') {
                        combinations.push({
                            price: req.body.productPrice[i],
                            color_id: req.body.colorSelected[i],
                            size_id: req.body.sizeSelected[i],
                            stock: req.body.productStock[i],
                            discount_id: req.body.discountSelected[i],
                            details: req.body.productDetail[i]
                        })
                    }
                }
            } else {
                // *********************************************************************
                // En el caso de que del body llegue un solo elemento por característica,  
                // no llega un array, por ende el length es cero en cada elemento, 
                // entonces creamos el el array de combunations a continuación.
                // *********************************************************************
                combinations.push({
                    price: req.body.productPrice,
                    color_id: req.body.colorSelected,
                    size_id: req.body.sizeSelected,
                    stock: req.body.productStock,
                    discount_id: req.body.discountSelected,
                    details: req.body.productDetail
                })
            }
            // ********************************************************************
        /*    console.log(combinations);
            console.log(req.body.productName);
            console.log(req.body.detail);
            console.log(req.body.collectionSelected);
            console.log(req.body.discountSelectedItem);
            console.log(req.body.colorSelected);
            console.log(req.body.sizeSelected);
            console.log(req.body.productPrice);
            console.log(req.body.productDetail);
            console.log(req.body.productStock);
            console.log(req.body.discountSelected)
        */
            //************************************************************************** 
            // Si de la vista llega el campo de descuento vacío no se ejecuta el create
            //************************************************************************** 
            if (!req.body.discountSelected) {
                return res.redirect('/product/productsTable')
            }
            //**************************************************************************
            const productCreated = await Products.update({
                name: req.body.productName,
                description: req.body.detail,
                collection_id: req.body.collectionSelected,
                discount_id: req.body.discountSelectedItem
            },{
                where: {
                    id: req.body.productId
                }
            }
            );
        //    console.log(productCreated);
        for (const combination of combinations) {
            // **************************************************************************
            // Acá cargamos la tabla pivot caracteristicas con el array "combinations" 
            // **************************************************************************
    /*        console.log(combination)
            console.log(parseInt(combination.color_id))
            console.log(parseInt(combination.size_id))
            console.log(combination.stock)
            console.log(combination.price)
            console.log(combination.details)
            console.log(parseInt(combination.discount_id))
    */
            const characteristicProduct = await Characteristics.findAll( {
                    where: {
                        product_id: req.body.productId,
                        color_id: parseInt(combination.color_id),
                        size_id: parseInt(combination.size_id)
                    },
                }            
            )
            //console.log("*** Combinación:", req.body.productId , "/", parseInt(combination.color_id) , "/", parseInt(combination.size_id))
            //console.log(characteristicProduct.length)
            // *******************************************************************************
            // Si la combinación no existe, el array va a estar vacío y entonces hay que  
            // creas el registro en Characteristic con esa combinación.
            // *******************************************************************************
            if (characteristicProduct.length == 0) {
                const characteristic = await Characteristics.create({
                    product_id: req.body.productId,
                    color_id: parseInt(combination.color_id),
                    size_id: parseInt(combination.size_id),
                    stock: combination.stock,
                    price: combination.price,
                    details: combination.details,
                    discount_id: parseInt(combination.discount_id)
                });
                // *******************************************************************************
                // Usa addCharacteristic para agregar cada combinación. Así le pasamos a products  
                // la asociación con las tablas colors y sizes por medio de characteristics.
                // *******************************************************************************
                //await productCreated.addCharacteristic(characteristic);
                // *******************************************************************************
            } else {
                // *******************************************************************************
                // Si la combinación existe, entonces hacemos un update de esa combinación. 
                // *******************************************************************************
                characteristic = await Characteristics.update({
                    product_id: productCreated.id,
                    color_id: parseInt(combination.color_id),
                    size_id: parseInt(combination.size_id),
                    stock: combination.stock,
                    price: combination.price,
                    details: combination.details,
                    discount_id: parseInt(combination.discount_id)
                }, {
                    where: {
                        product_id: req.body.productId,
                        color_id: parseInt(combination.color_id),
                        size_id: parseInt(combination.size_id)
                    }
                });
                // *******************************************************************************
                // Usa addCharacteristic para agregar cada combinación. Así le pasamos a products  
                // la asociación con las tablas colors y sizes por medio de characteristics.
                // *******************************************************************************
                //await productCreated.setCharacteristic(characteristic);
                // *******************************************************************************
            }
        };
            return res.redirect('/product/productItemsTable');
        } catch (error) {
            console.log(error);
        };
    },

    deleteItemProduct : async (req , res) => {
        console.log("Entraste de delete de item de products: " , req.params.id);
        try {
            const deleteItemProduct = await Products.findByPk(req.params.id , {
                    include:[
                        {association: 'productCollection'} , 
                        {association: 'productPhoto'} , 
                        {association: 'productDiscount'} , 
                        {
                            model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'color_id', 'size_id','discount_id'],
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['discount_code' , 'discount']
                                },
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                }
                            ]
                        }
                    ]
            });
    //        return res.send(deleteItemProduct)
            return res.render('./products/productItemDelete' , {deleteItemProduct : deleteItemProduct})
        } catch (error) {
            console.log(error)
        }
    },

    destroyItemProduct : async (req , res) => {
        console.log("Entraste a destroy de item de productos: " , req.params.id);
        try {
            await Promise.all([Products.destroy({where: { id: req.params.id}}), Characteristics.destroy({where:{product_id: req.params.id}})]);
            return res.redirect('/product/productItemsTable');
        } catch (error) {
            console.log(error);
        }
    },

// *********************************    
// Color's Table  Controllers
// *********************************  

    itemsColors : async (req, res) => {
        console.log("entraste a colorItemsTable" );
        try {
            const colorItems = await Colors.findAll(
                {
                    paranoid:false,
                    include: [
                        {model: Products},
                        {model: Sizes}
                    ]
                }
            );
    //    return res.send(colorItems)

            return res.render('./products/colorItemsTable' , {colorItems : colorItems});
        } catch (error) {
            console.log(error)
        };        
    },

    colors : async(req, res) => {
        console.log("entraste a colorsTable" );
        try {
        //    const colors = await Colors.findAll();
            return res.render('./products/colorsTable');
        //    return res.render('./products/colorsTable' , {colors : colors});
        } catch (error) {
            console.log(error);
        }
    },

    processColors :  async (req, res) => {
        console.log("Entraste por post a processColors");
        try {
            await Colors.create({
                name: req.body.colorName,
                description: req.body.detail
            })
            return res.redirect('/product/colorItemsTable');
        } catch (error) {
            console.log(error);
        }
    },

    editItemColor : async (req, res) => {
        console.log("Entraste por get a editItemColor ----> id: ", req.params.id);
        try {
            colorItem = await Colors.findByPk(req.params.id) 
            return res.render('./products/colorItem' , {colorItem : colorItem});
        } catch (error) {
            console.log(error);
        }
    },

    updateItemColor : async (req, res) => {
        console.log("Entraste por post a updateItemColor");
        try {
            await Colors.update({
                name: req.body.colorName,
                description: req.body.detail,
            },{
                include: [
                    {model: Products},
                    {model: Sizes}
                ],
                where: {
                    id: req.body.colorId
                }
            })
            return res.redirect('/product/colorItemsTable');
        } catch (error) {
            console.log(error);
        };
    },

    deleteItemColor : async (req , res) => {
        console.log("Entraste de delete de item de color: " , req.params.id);
        try {
            const deleteItemColor = await Colors.findByPk(req.params.id,
                {
                    include: [
                        {model: Products},
                        {model: Sizes}
                    ],
                    where: {
                        id: req.body.colorId
                    }
                });
            const colorInProduct = deleteItemColor.Products.length;
            const colorInSize = deleteItemColor.Sizes.length;
            console.log(colorInProduct , " --" , colorInSize)
            if(colorInProduct == 0 && colorInSize == 0) {
                return res.render('./products/colorItemDelete' , {deleteItemColor : deleteItemColor})
            } else {
                return res.render('./products/colorItemDeleteImpossible' , { colorInProduct : colorInProduct , colorInSize : colorInSize})
            }

        //    return res.send(deleteItemColor)

        //    return res.render('./products/colorItemDelete' , {deleteItemColor : deleteItemColor})
        } catch (error) {
            console.log(error)
        }
    },

    destroyItemColor : async (req , res) => {
        console.log("Entraste a destroy de item de colores: " , req.params.id);
        try {
            await Colors.destroy({
                where: { id: req.params.id}
            })
            return res.redirect('/product/colorItemsTable');
        } catch (error) {
            console.log(error);
        }
    },

    restoreItemColor : async (req , res) => {
        console.log("Entraste a restore de item de colores: " , req.params.id);
        try {
            await Colors.restore({
                where: { id: req.params.id}
            })
            return res.redirect('/product/colorItemsTable');
        } catch (error) {
            console.log(error);
        }
    },





// *********************************    
// Collection's Table  Controllers
// *********************************  

    itemsCollections : async (req, res) => {
        console.log("entraste a collectionItemsTable" );
        try {
            const collectionItems = await Collections.findAll(
                {
                    include: [{association: 'collectionDiscount'}],
                    paranoid:false
            }
        );

        console.log(collectionItems)
    //    return res.send(collectionItems)

            return res.render('./products/collectionItemsTable' , {collectionItems : collectionItems});
        } catch (error) {
            console.log(error)
        };        
    },

    collections : async(req, res) => {
        console.log("entraste a collectionsTable" );
        try {
            const discounts = await Discounts.findAll();
            return res.render('./products/collectionsTable' , {discounts : discounts});
        } catch (error) {
            console.log(error);
        }
    },

    processCollections :  async (req, res) => {
        console.log("Entraste por post a processCollections");
        try {
            //************************************************* */
            // Si de la vista llega el campo de descuento vacío no se ejecuta el create
            //************************************************* */
            if (!req.body.discountSelected) {
                return res.redirect('/product/collectionsTable')
            }
            //************************************************* */
            await Collections.create({
                name: req.body.collectionName,
                description: req.body.detail,
                discount_id: req.body.discountSelected
            })
            return res.redirect('/product/collectionItemsTable');
        } catch (error) {
            console.log(error);
        }
    },

    editItemCollection : async (req, res) => {
        console.log("Entraste por get a editItemCollection ----> id: ", req.params.id);
        try {
            const [collectionItem , discounts]= await Promise.all([
                Collections.findByPk(req.params.id, {
                    include: [{ association: 'collectionDiscount' }]
                    }),
                Discounts.findAll()
            ]) 
            return res.render('./products/collectionItem' , {collectionItem : collectionItem , discounts : discounts})
        } catch (error) {
            console.log(error);
        }
    },

    updateItemCollection : async (req, res) => {
        console.log("Entraste por post a updateItemCollection");
        try {
            await Collections.update({
                name: req.body.collectionName,
                description: req.body.detail,
                discount_id: req.body.discountSelected
            },{
                include: [
                    {association: 'collectionProduct'},
                    {association: 'collectionDiscount'}
                ],
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
            const deleteItemCollection = await Collections.findByPk(req.params.id,
                {
                    include: [
                        {association: 'collectionProduct'}
                    ]  
                });
            const collectionInProduct = deleteItemCollection.collectionProduct.length;
            console.log(collectionInProduct);
        //    res.send(deleteItemCollection)
            if (collectionInProduct == 0) {
                return res.render('./products/collectionItemDelete' , {deleteItemCollection : deleteItemCollection})
            } else {
                return res.render('./products/collectionItemDeleteImpossible' , { collectionInProduct : collectionInProduct})
            }





            //return res.render('./products/collectionItemDelete' , {deleteItemCollection : deleteItemCollection})
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

    restoreItemCollection : async (req , res) => {
        console.log("Entraste a restore de item de colecciones: " , req.params.id);
        try {
            await Collections.restore({
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
            const discountItems = await Discounts.findAll(
                {
                    paranoid:false,
                    include: [
                        {association: 'discountProduct'},
                        {association: 'discountCollection'},
                        {association: 'discountCharacteristic'}
                    ]
                }
            );
        //    return res.send(discountItems)
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
                include: [
                    {association: 'discountProduct'},
                    {association: 'discountCollection'},
                    {association: 'discountCharacteristic'}
                ],
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
            const deleteItemDiscount = await Discounts.findByPk(req.params.id,
                {
                    include: [
                        {association: 'discountProduct'},
                        {association: 'discountCollection'},
                        {association: 'discountCharacteristic'}
                    ],
                    where: {
                        id: req.body.discountId
                    }
                } 
            );
            const discountInProduct = deleteItemDiscount.discountProduct.length;
            const discountInCollection = deleteItemDiscount.discountCollection.length;
            const discountInCharacteristic = deleteItemDiscount.discountCharacteristic.length;
            console.log(discountInProduct , " -- " , discountInCollection , " -- " , discountInCharacteristic)
            if(discountInProduct == 0 && discountInCollection == 0 && discountInCharacteristic == 0 ) {
                return res.render('./products/discountItemDelete' , {deleteItemDiscount : deleteItemDiscount})
            } else {
                return res.render('./products/discountItemDeleteImpossible' , { discountInProduct : discountInProduct , discountInCollection : discountInCollection , discountInCharacteristic : discountInCharacteristic})
            }
            
        //    return res.render('./products/discountItemDelete' , {deleteItemDiscount : deleteItemDiscount})
        } catch (error) {
            console.log(error)
        }
    },

    destroyItemDiscount : async (req , res) => {
        console.log("Entraste a destroy de item de descuento: " , req.params.id);
        try {
            await Discounts.destroy({
                include: [
                    {
                        association: 'discountProduct',
                        association: 'discountCollection',
                        association: 'discountCollection'
                    }
                ],
                where: { id: req.params.id}
            })
            return res.redirect('/product/discountItemsTable');
        } catch (error) {
            console.log(error);
        }
    },

    restoreItemDiscount : async (req , res) => {
        console.log("Entraste a restore de item de descuentos: " , req.params.id);
        try {
            await Discounts.restore({
                where: { id: req.params.id}
            })
            return res.redirect('/product/discountItemsTable');
        } catch (error) {
            console.log(error);
        }
    }


    
};
