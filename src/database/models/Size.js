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

    Size.associate = (models) => {

        Size.belongsToMany(models.Product , 
            {
            //    as: "sizeProduct",
                through: "Characteristic",
                foreignKey: "size_id",
                otherKey: "product_id"
            }),

        Size.belongsToMany(models.Color , 
            {
            //    as: "sizeColor",
                through: "Characteristic",
                foreignKey: "size_id",
                otherKey: "color_id"
            }),

        Size.hasMany(models.Characteristic, {
            foreignKey: 'size_id',
        })

    }
    return Size;
    }