const express = require('express');
const path = require('path');
const mysql = require('mysql'); 
const dotenv=require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'juegos' 
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname +'/public'));

con.connect(function(err){
    if(err){
        console.log("El error de la conexion es: "+ err);
        return;
    }else{
        console.log("Conectado a la base de datos yei");
    }
});

//settings
app.set('appName', 'Holaa');
app.set('port', 3300);
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
//middlewares

console.log(__dirname);

dotenv.config({path:'./env/.env'});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.post( '/registro', async(req, res)=>{
    let nombre= req.body.usuario;
    let contraseña= req.body.password;
    let mail = req.body.email;
    let passwordHaash = await bcryptjs.hash(contraseña, 8);
    con.query('INSERT INTO juego SET ?',{nombre: nombre, contraseña: password, mail: mail}, async(error, results)=>{
        if(error){
            console.log(error);
            res.redirect('Registro');
        }else{
            console.log("Pudo conectar");
            res.redirect('principal');
        }
    });
});

app.post( '/registro', async(req, res)=>{
    const nombre= req.body.usuario;
    const contraseña= req.body.password;
    const mail = req.body.email;
    const scores = 0;
    let passwordHaash = await bcryptjs.hash(contraseña, 8);
    con.query('INSERT INTO juego SET ?',{nombre: nombre, contraseña: password, score1: scores, score2: scores, score3: scores, mail: mail}, async(error, results)=>{
        if(error){
            console.log(error);
            res.redirect('/Registro');
        }else{
            console.log("Pudo conectar");
            res.redirect('/principal');
        }
    });
});

app.post('/auth', function(request, response) {
	let username = request.body.usuario;
	let password = request.body.password;

	if (username && password) {
		con.query('SELECT * FROM juego WHERE nombre = ? AND contraseña = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/principal');
			} else {
				response.send('Nombre y/o contraseña incorrecta!');
			}			
			response.end();
		});
	} else {
		response.send('Por favor introduzca un usuario o contraseña!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/register', (req, res)=>{
    res.render('Registro');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/principal', (req, res)=>{
    res.render('principal');
});
app.get('/Ahorcado', (req, res)=>{
    res.render('Ahorcado');
});

app.get('/Juego1', (req, res)=>{
    res.render('Juego1');
});

app.get('/Juego2', (req, res)=>{
    res.render('Juego2');
});

app.get('/Juego3', (req, res)=>{
    res.render('Juego3');
});
app.get('/Buscamina', (req, res)=>{
    res.render('Buscamina');
});

app.get('/Rosco', (req, res)=>{
    res.render('Rosco');
});

app.listen(3300 ,(req, res) =>{
    console.log('server runing in http://localhost:3300');
});

