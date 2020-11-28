// JQUERY Consultar base de datos y mostrar en una tabla

$("#home-tab1").click(function () {
    submitConsulta();
});





function submitConsulta() {
    console.log("Entró a llamar");
    fetch('http://localhost:3000/getVehiculos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(result => {
            if (result.length > 0) {
                cargarDatos(result);
            } else {
                console.log(JSON.stringify(result));
            }
        })
        .catch(error => console.log('error: ' + error));
}


// Insertar datos de usuario
$(document).ready(function () {
    $("#registform").submit(function (event) {
        console.log("entro a registform");
        event.preventDefault();
        submitFormRegister();
    });
});

$(document).ready(function () {
    $("#loginform").submit(function (event) {
        console.log("entro a loginform");
        event.preventDefault();
        submitFormLogin();
    });
});





function submitFormRegister() {

    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var correo = $("#correo").val();
    var username = $("#username").val();
    var password = $("#password").val();

    var user = {
        nombre,
        apellidos,
        correo,
        username,
        password,
    };


    fetch('http://localhost:3000/insertUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        cache: 'no-cache'
    }).then(function (response) {
        console.log("entró");
        return response.text();
    }).then(function (data) {
        console.log('data = ', data);
        if (data === "OK") {
            formSuccess();
            document.getElementById("registform").reset();
        } else {
            alert("Error al insertar");
        }
    }).catch(function (err) {
        console.error(err);
    });
}


function submitFormLogin() {

    var username = $("#uservalidate").val();
    var password = $("#passwordvalidate").val();

    var user = {
        username,
        password,
    };


    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        cache: 'no-cache'
    }).then(function (response) {
        console.log("entró");
        return response.text();
    }).then(function (data) {
        console.log('data = ', data);
        if (data === "OK") {
            loginSuccess();
        } else {
            alert("Usuario no existe");
        }
    }).catch(function (err) {
        console.error(err);
    });
}

function loginSuccess() {
    location.href ="indexito.html";
    
}

function formSuccess() {
    alert("Datos almacenados");
}
