const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const session = require('express-session');


app.use(express.static("./assets"));

app.use(session({
    secret: "Nano Secret Session",
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3004, () => 
console.log ('servidor corriendo en el puerto 3004'));


app.use(mainRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
