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

        quantity: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        unit_price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },

        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }

    
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'Product-ticket',
        paranoid: false,
        createdAt: 'created_at'
    }
    const ProductTicket = sequelize.define(alias,cols,config);
  

    return ProductTicket
};