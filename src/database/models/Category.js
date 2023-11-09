module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        roles: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

    };
     let config = {
        timestamps: true,
        tableName : 'categories',
        freezeTableName: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
     }
     const Category = sequelize.define(alias,cols,config);

     Category.associate = (models) => {
        Category.hasMany(models.User, {
            as: "categoryUser",
            foreingKey: "user_id"

        })
     }
     return Category;

}