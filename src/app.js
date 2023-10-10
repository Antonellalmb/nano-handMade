const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRouter');



app.use(express.static("./assets"));

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3004, () => 
console.log ('servidor corriendo en el puerto 3004'));


app.use(mainRouter);