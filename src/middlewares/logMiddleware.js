
const logMiddleware = (req, res, next) => {
    if (!req.session.usuarioLogeado) {
        res.locals.isLogged = false;
        next();
    } else {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.usuarioLogeado;
        next();
    }
};

module.exports = logMiddleware;
/*
const logMiddleware = (req, res, next) => {
    if(!req.session.usuarioLogeado){
        return res.redirect('/user/login')
    }else{
        next();
    }
}

module.exports = logMiddleware;*/