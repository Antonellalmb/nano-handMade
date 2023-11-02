module.exports = {
    login: (req, res) => {
        return res.render('login')
    },

    loginProcess: (req, res) => {
        console.log("Ingresaste Datos Login ")
        console.log("Minuto 48 clase 32")

        
        return res.render('login')
    },

    register: (req, res) => {
        return res.render('register')
    }


    
};
