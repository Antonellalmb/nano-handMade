module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        
        collection_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        discount_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }

    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'products',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = (models) => {
        Product.belongsTo(models.Collection , 
            {
                as: "productCollection",
                foreignKey: "collection_id",
            }),

        Product.hasMany(models.Photo,
            {
                as: "productPhoto",
                foreignKey: "product_id",
            }),

            Product.belongsToMany(models.Color , 
                {
                    through: "Characteristic",
                    foreignKey: "product_id",
                    otherKey: "color_id"
                }),
            
            Product.belongsToMany(models.Size , 
                {
                    through: "Characteristic",
                    foreignKey: "product_id",
                    otherKey: "size_id"
                })

    }

    return Product;
    }
