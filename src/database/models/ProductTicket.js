module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductTicket'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        ticket_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        characteristic_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        item_quantity: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        item_unit_price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },

        item_discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }

    
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'product-tickets',
        paranoid: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const ProductTicket = sequelize.define(alias,cols,config);
  

    return ProductTicket
};