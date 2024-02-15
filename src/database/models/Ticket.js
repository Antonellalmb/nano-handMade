module.exports = (sequelize, dataTypes) => {
    let alias = 'Ticket'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        user_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },

        number: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
       
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },

        total: {
            type: dataTypes.DECIMAL(12,2).UNSIGNED,
            allowNull: false
        },

        payment_order: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },

        payment_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },

        payer_id: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: true
        }

    };

    let config = {
        timestamps: true,
        freezeTableName: true,
        tableName: 'tickets',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'

    }
    const Ticket = sequelize.define(alias,cols,config);

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.User , 
            {
                as: "ticketUser",
                foreignKey: "user_id"
            });
        
        Ticket.belongsToMany(models.Characteristic,
            {
            //    as:"characteristics",
                through: "ProductTicket",
                foreignKey:"ticket_id",
                otherKey:"characteristic_id"
            //    foreignKey:"characteristic_id",
            //    otherKey:"ticket_id"
            })

    }
    
    return Ticket;

 }