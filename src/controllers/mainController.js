module.exports = {
    home : (req, res) => {
        return res.render('home')
    },

    products : (req, res) => {
        return res.render('products')
    },

    login: (req, res) => {
        return res.render('login')
    },

    register: (req, res) => {
        return res.render('register')
    }


    
};
