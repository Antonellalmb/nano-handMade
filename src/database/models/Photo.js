module.exports = (sequelize, dataTypes) => {
    let alias = 'Photo'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        product_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        product_image: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'photos',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Photo = sequelize.define(alias,cols,config);

    Photo.associate = (models) => {
        Photo.belongsTo(models.Product , 
            {
                as: "photoProduct",
                foreignKey: "product_id",
            })

    }

    return Photo;
    }
