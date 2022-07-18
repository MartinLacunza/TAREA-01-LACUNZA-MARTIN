const express = require ('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 8080;
const mysql = require('mysql2');
const path = require('path');
const nodemailer = require('nodemailer');


//conexion a la base de datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
});
const conectar = (
    conexion.connect((error) =>{
        if(error) throw error;
        console.log('Base de Datos Conectada!!');
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//configuramos la vista de la aplicacion


/*app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
*/



app.post('./PAGES/contacto.html', (req, res) =>{
    //console.log(req.body);
    /*console.log(req.body.nombre);
    console.log(req.body.precio);
    console.log(req.body.descripcion);*/
    const {nombre, telefono, correo, descripcion} = req.body;


    if(nombre == "" || telefono == ""|| correo == ""|| descripcion == ""){
        let validacion = 'Faltan datos para ingresar la consulta'
        res.render(PAGES/contactos.html, {
            validacion
        })} else{
        console.log(nombre);
        console.log(telefono);
        console.log(correo);
        console.log(descripcion);



        //conectar();
        let data = {
            contacto_nombre: nombre,
            contacto_telefono: telefono,
            contacto_correo: correo,
            contacto_descripcion: descripcion
        };

        let sql = "INSERT INTO FORMULARIO SET ?";

        let query = conexion.query(sql, data, (err, results) =>{
            if(err) throw err;
            res.render('/PAGES/contacto.html')
        });
    };
});




app.listen(Port, ()=>{
    console.log(`Servidor corriendo en el puerto ${Port}`);
});

app.on('error', (error)=>{
    console.log(`Tenemos un error ${error}`);
})