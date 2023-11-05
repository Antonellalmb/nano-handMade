module.exports = (sequelize, dataTypes) => {
    let alias = 'Collection'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(20),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(255),
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
        tableName: 'collections',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Collection = sequelize.define(alias,cols,config);

    Collection.associate = (models) => {
        Collection.hasMany(models.Product,
            {
                as: "collectionProduct",
                foreignKey: "collection_id",
            })
    }

    return Collection;
    }