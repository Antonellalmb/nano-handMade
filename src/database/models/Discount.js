module.exports = (sequelize, dataTypes) => {
    let alias = 'Discount'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        discount_code: {
            type: dataTypes.STRING(20),
            allowNull: false
        },

        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'discounts',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Discount = sequelize.define(alias,cols,config);

    Discount.associate = (models) => {
        Discount.hasMany(models.Collection,
            {
                as: "discountCollection",
                foreignKey: "discount_id",
            })
    }

    return Discount;
    }