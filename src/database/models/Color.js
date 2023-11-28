module.exports = (sequelize, dataTypes) => {
    let alias = 'Color'; 
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
        tableName: 'colors',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Color = sequelize.define(alias,cols,config);

    Color.associate = (models) => {

            Color.belongsToMany(models.Product , 
                {
            //        as: "colorProduct",
                    through: "Characteristic",
                    foreignKey: "color_id",
                    otherKey: "product_id"
                }),

            Color.belongsToMany(models.Size , 
                {
            //        as: "colorSize",
                    through: "Characteristic",
                    foreignKey: "color_id",
                    otherKey: "size_id"
                }),

            Color.hasMany(models.Characteristic, {
                foreignKey: 'color_id',
            })

    }


    return Color;
    }