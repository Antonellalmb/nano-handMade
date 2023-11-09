module.exports = (sequelize, dataTypes) => {
    let alias = 'Tax'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        type: {
            type: dataTypes.STRING(30),
            allowNull: false,
        },

        percent: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'taxes',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Tax = sequelize.define(alias,cols,config);

    Tax.associate = (models) => {
        Tax.hasMany(models.User, {
            as: "taxUser",
            foreingKey: "tax_id"

        })
     }
     return Tax;

}