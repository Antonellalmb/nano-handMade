module.exports = (sequelize, dataTypes) => {
    let alias = 'Size'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'sizes',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Size = sequelize.define(alias,cols,config);
    return Size;
    }