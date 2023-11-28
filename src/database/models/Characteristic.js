module.exports = (sequelize, dataTypes) => {
    let alias = 'Characteristic'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },

        details: {
            type: dataTypes.STRING(255),
            allowNull: false
        },

        discount_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'characteristics',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Characteristic = sequelize.define(alias,cols,config);

    Characteristic.associate = (models) => {
        // Asociación con Product
        Characteristic.belongsTo(models.Product, {
            foreignKey: 'product_id',
        });

        // Asociación con Color
        Characteristic.belongsTo(models.Color, {
            foreignKey: 'color_id',
        });

        // Asociación con Size
        Characteristic.belongsTo(models.Size, {
            foreignKey: 'size_id',
        });

        Characteristic.belongsTo(models.Discount , 
            {
                as: "characteristicDiscount",
                foreignKey: "discount_id",
            })


    }

    return Characteristic;
    }