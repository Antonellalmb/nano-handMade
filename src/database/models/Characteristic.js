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



    
    return Characteristic;
    }