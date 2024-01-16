const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

const Products = db.Product;
const Collections = db.Collection;
const Discounts = db.Discount;
const Colors = db.Color;
const Sizes = db.Size;
const Characteristics = db.Characteristic;
const Photos = db.Photo;


module.exports = {

    products : async (req, res) => {
        console.log("entraste a API productos" );
        const response = { data : {
            success : true,
            endPoint: '/api/product',
            nameDB: 'Product',
            }
        }
        try {
            const data = await Products.findAll(
                {   attributes: ['id' , 'name' , 'description' , 'collection_id' , 'discount_id'] , 
                    include:[
                        {association: 'productDiscount',
                        attributes: ['id' , 'discount_code' , 'discount']} , 
                        {association: 'productCollection',
                        attributes: ['name' , 'description']} , 
                        {association: 'productPhoto',
                        attributes: ['product_id' , 'product_image']}, 
                        
                        {model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'discount_id'],
                        
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['id' , 'discount_code' , 'discount']},
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                },
                                {association: 'characteristicDiscount',
                                attributes: ['id' , 'discount_code' , 'discount']} 
                            ]
                        }
                ]}
            )
            response.data.count = data.length;
            response.data.data = data;
            return res.json(response);


        //       return res.send(productTable)
        //    return res.render('./products/products' , { productTable : productTable});
        } catch (error) {
            console.log(error)
        }
    },

    productsMar : async (req, res) => {
        console.log("entraste a API productos filtro colección Mar" );
        const response = { data : {
            success : true,
            endPoint: '/api/product/mar',
            nameDB: 'Product',
            }
        }
        try {
            const collectionId = await Collections.findAll({where:{name:"Mar"}})
            const data = await Products.findAll(
                {   attributes: ['id' , 'name' , 'description' , 'collection_id' , 'discount_id'] , 
                    include:[
                        {association: 'productDiscount',
                        attributes: ['id' , 'discount_code' , 'discount']} , 
                        {association: 'productCollection',
                        attributes: ['name' , 'description']} , 
                        {association: 'productPhoto',
                        attributes: ['product_id' , 'product_image']}, 
                        
                        {model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'discount_id'],
                        
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['id' , 'discount_code' , 'discount']},
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                },
                                {association: 'characteristicDiscount',
                                attributes: ['id' , 'discount_code' , 'discount']} 
                            ]
                        }
                ],
                where: {collection_id: collectionId[0].id }
                }
            )
            response.data.count = data.length;
            response.data.data = data;
            return res.json(response);

        //        return res.send(productTable)
        //    return res.render('./products/products' , { productTable : productTable});
        } catch (error) {
            console.log(error)
        }
    },

    productsTerra : async (req, res) => {
        console.log("entraste a API productos filtro colección Terra" );
        const response = { data : {
            success : true,
            endPoint: '/api/product/terra',
            nameDB: 'Product',
            }
        }
        try {
            const collectionId = await Collections.findAll({where:{name:"Terra"}})
            const data = await Products.findAll(
                {   attributes: ['id' , 'name' , 'description' , 'collection_id' , 'discount_id'] , 
                    include:[
                        {association: 'productDiscount',
                        attributes: ['id' , 'discount_code' , 'discount']} , 
                        {association: 'productCollection',
                        attributes: ['name' , 'description']} , 
                        {association: 'productPhoto',
                        attributes: ['product_id' , 'product_image']}, 
                        
                        {model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'discount_id'],
                        
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['id' , 'discount_code' , 'discount']},
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                },
                                {association: 'characteristicDiscount',
                                attributes: ['id' , 'discount_code' , 'discount']} 
                            ]
                        }
                ],
                where: {collection_id: collectionId[0].id }
                }
            )
            response.data.count = data.length;
            response.data.data = data;
            return res.json(response);
        //        return res.send(productTable)
        //    return res.render('./products/products' , { productTable : productTable});
        } catch (error) {
            console.log(error)
        }
    },

    productsLuminarias : async (req, res) => {
        console.log("entraste a API productos filtro Luminarias y Decoración" );
        const response = { data : {
            success : true,
            endPoint: '/api/product/luminarias',
            nameDB: 'Product',
            }
        }
        try {
            const collectionId = await Collections.findAll({where:{name:"Luminarias"}})
            const data = await Products.findAll(
                {   attributes: ['id' , 'name' , 'description' , 'collection_id' , 'discount_id'] , 
                    include:[
                        {association: 'productDiscount',
                        attributes: ['id' , 'discount_code' , 'discount']} , 
                        {association: 'productCollection',
                        attributes: ['name' , 'description']} , 
                        {association: 'productPhoto',
                        attributes: ['product_id' , 'product_image']}, 
                        
                        {model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'discount_id'],
                        
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['id' , 'discount_code' , 'discount']},
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                },
                                {association: 'characteristicDiscount',
                                attributes: ['id' , 'discount_code' , 'discount']} 
                            ]
                        }
                ],
                where: {collection_id: collectionId[0].id }
                }
            )
            response.data.count = data.length;
            response.data.data = data;
            return res.json(response);
        //        return res.send(productTable)
        //    return res.render('./products/products' , { productTable : productTable});
        } catch (error) {
            console.log(error)
        }
    },

    productsSearch : async (req, res) => {
        console.log("entraste a API productos por buscador" );
        const response = { data : {
            success : true,
            endPoint: '/api/product/search',
            nameDB: 'Product',
            }
        }
        try {
            const data = await Products.findAll(
                {   attributes: ['id' , 'name' , 'description' , 'collection_id' , 'discount_id'] , 
                    include:[
                        {association: 'productDiscount',
                        attributes: ['id' , 'discount_code' , 'discount']} , 
                        {association: 'productCollection',
                        attributes: ['name' , 'description']} , 
                        {association: 'productPhoto',
                        attributes: ['product_id' , 'product_image']}, 
                        
                        {model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'discount_id'],
                        
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['id' , 'discount_code' , 'discount']},
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                },
                                {association: 'characteristicDiscount',
                                attributes: ['id' , 'discount_code' , 'discount']} 
                            ]
                        }
                ],
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${req.query.query}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${req.query.query}%`
                            }
                        }
                    ]
                }

                
                }
            )
            console.log(data)
            response.data.count = data.length;
            response.data.data = data;
            return res.json(response);
        //    return res.send(productTable)
        //    return res.render('./products/products' , { productTable : productTable});
        } catch (error) {
            console.log(error)
        }
    },

    product : async (req, res) => {
        console.log("entraste a API producto" , req.params.id );
        let urlApi = '/api/product/'+req.params.id ;
        const response = { data : {
            success : true,
            endPoint: urlApi,
            nameDB: 'Product',
            }
        }
        try {
            const data = await Products.findByPk( req.params.id ,
                {   attributes: ['id' , 'name' , 'description' , 'collection_id' , 'discount_id'] , 
                    include:[
                        {association: 'productDiscount',
                        attributes: ['id' , 'discount_code' , 'discount']} , 
                        {association: 'productCollection',
                        attributes: ['name' , 'description']} , 
                        {association: 'productPhoto',
                        attributes: ['product_id' , 'product_image']}, 
                        
                        {model: Characteristics,
                            //as: 'productCharacteristic',
                            attributes: ['stock', 'price', 'details', 'discount_id'],
                        
                            include: [
                                {
                                    association: 'characteristicDiscount',
                                    attributes: ['id' , 'discount_code' , 'discount']},
                                {
                                    model: Colors,
                                    //as: 'color',
                                    attributes: ['name', 'description']
                                },
                                {
                                    model: Sizes,
                                    //as: 'size',
                                    attributes: ['name', 'description']
                                },
                                {association: 'characteristicDiscount',
                                attributes: ['id' , 'discount_code' , 'discount']} 
                            ]
                        }
                ]}
            )
            
            console.log(Array.isArray(data))
            if (Array.isArray(data)) {
                count = data.length
            } else {
                count = 1
            }
            response.data.count = count;
            response.data.data = data;
            return res.json(response);
        //        return res.send(productItem)
        //    return res.render('./products/product' , { productItem : productItem});
        } catch (error) {
            console.log(error)
        }
    }
}