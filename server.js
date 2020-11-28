const express = require("express"); // Gestión de las peticiones HTTP
const mysql = require('mysql'); // Gestión de la base de datos
const bodyParser = require('body-parser'); // Transformaciones de JSON
const util = require('util'); // Callbacks.

// - Inicio Configuración del servidor web

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

// - Fin Configuración servidor web

// 
function crearConexion() {
	connection = mysql.createConnection({
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '',
		database: 'test'
	});
	return {
		query(sql, args) {
			return util.promisify(connection.query)
				.call(connection, sql, args);
		},
		close() {
			return util.promisify(connection.end).call(connection);
		}
	};
}

app.post("/insertUser", async function (req, res) {
	var mensaje = "OK";
	const user = {
		nombre: req.body.nombre,
		apellidos: req.body.apellidos,
		correo: req.body.correo,
		username: req.body.username,
		password: req.body.password,
	}
	console.log(user);

	const connectionDB = crearConexion();

	try {
		const results = await connectionDB.query("INSERT INTO usuario SET ?", user);
		console.log("insertado");
	} catch (err) {
		console.log('Error al insertar usuario');
		console.log(err);
		mensaje = "NO_OK";
	} finally {
		res.send(mensaje);
	}
});

app.post("/insertProduct", async function (req, res) {
	var mensaje = "OK";
	const producto = {
		nombre: req.body.nombre,
		valor: req.body.valor,
		cantidad: req.body.cantidad,
		direccion: req.body.direccion,
		
	}
	console.log(producto);

	const connectionDB = crearConexion();

	try {
		const results = await connectionDB.query("INSERT INTO producto SET ?", producto);
		console.log("insertado");
	} catch (err) {
		console.log('Error al insertar usuario');
		console.log(err);
		mensaje = "NO_OK";
	} finally {
		res.send(mensaje);
	}
});




app.post("/login", async function (req, res) {
	var data = {
		username: req.body.username,
		password: req.body.password,
	}
	const connectionDB = crearConexion();
	console.log(data);
	message = "BAD";
	try {
		const rows = await connectionDB.query("SELECT * from usuario where username='" + data.username + "' and password='" + data.password + "';");
		console.log(rows.length);
		if (rows.length > 0) {
			message = "OK";
		}
	} catch (err) {
		console.log('Error while performing Query');
		console.log(err);
		message = "BAD";
	} finally {
		res.send(message);
		
		await connectionDB.close();
	}
});