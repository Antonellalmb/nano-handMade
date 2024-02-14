const express = require('express');
const cors = require('cors') ;
const mercadopago = require("mercadopago");
// const http = require('http');   otrq forma de levantar el servidor
const path = require('path');
const app = express();
// const server = http.createServer(app);   otrq forma de levantar el servidor
const bodyParser = require('body-parser');
const port = process.env.PORT || 3004;
// app.set('port' , process.env.PORT || 3004)   otrq forma de levantar el servidor
const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js');
const productRouter = require('./routes/productRouter.js');
const productApiRouter = require('./routes/productApiRouter.js');


const mercadoPagoRouter = require('./routes/mercadoPagoRouter.js')
const methodOverride = require('method-override');
const session = require('express-session');
const cookieExisteMiddleware = require('./middlewares/cookieExisteMiddleware.js');
const cookie = require('cookie-parser');
const logMiddleware = require('./middlewares/logMiddleware.js');

// Agrega credenciales de MP
mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(express.static("./assets"));

app.use(cookie());

app.use(session({
    secret: "Nano Secret Session",
    resave: false,
    saveUninitialized: false
}))

app.use(cookieExisteMiddleware);
app.use(logMiddleware);



app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => 
console.log(`servidor corriendo en el puerto ${port}`));
// server.listen(app.get('port'), () =>   otrq forma de levantar el servidor
// console.log(`servidor corriendo en el puerto ` , app.get('port')));   otrq forma de levantar el servidor


app.use(mainRouter);
app.use(mercadoPagoRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/api/product', productApiRouter);