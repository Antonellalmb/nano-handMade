module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        usr_email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        usr_password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        usr_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
       
        usr_address: {
            type: dataTypes.STRING(255),
            allowNull: true
        },

        tax_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        usr_tax_number: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },

        category_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        }

    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'users',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = (models) => {
    User.belongsTo(models.Category , 
        {
            as: "userCategory",
            foreignKey: "category_id"
        })
    }
        return User;

 }

