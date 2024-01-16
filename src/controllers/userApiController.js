const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User; 

module.exports = {
    
    list: async (req , res) => {
        const response = { data : {
            success : true,
            endPoint: '/api/user',
            nameDB: 'User',
            }            
        }

        try {
    
            const data  = await Users.findAll({
            });
            console.log(data)
            response.data.count = data.length;
            const usuario = data.map(user => ({
                id: user.id,
                name: user.usr_name, 
                email: user.usr_correo, 
                detail: `/api/user/${user.id}`,
             
            }));
            response.data.data = usuario;
            console.log(data)
            return res.json(response);

        } catch (error) {
            response.data.success = false;
            response.data.msg = 'Hubo un error';
            return res.json(response);
        }
    },

    detail: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await Users.findByPk(userId, {
                attributes: {
                    exclude: [
                        'usr_password',
                        'usr_address',
                        'category_id',
                        'tax_id',
                        'usr_tax_number',
                        'created_at',
                        'updated_at',
                        'deleted_at',
                    ],
                },
            });

            if (!user) {
                return  'Usuario no encontrado' 
                //return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            return res.json({ data: user });
        } catch (error) {
            console.error(error);
            //return res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
};


