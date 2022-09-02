/*let userData;
let usersr;
let loginData;
let usersl;

// Login 
const btnIngreso = document.getElementById('btnIngreso')

function loginUser() {
  usersl = JSON.parse(localStorage.getItem('UsersLogin')) || [];
  loginData = [{
    loginEmail: document.getElementById('login-email').value
  }, {
    loginPass: document.getElementById('login-pass').value
  }];
  usersl.push(loginData)
  localStorage.setItem('UsersLogin', JSON.stringify(usersl))
  console.log(usersl)
  location.reload(location.href ='index.html')
}*/

/*function userRegistration() {
    const userData = {
        document.getElementById('register-email').value,
        document.getElementById('register-pass').value
    };
    localStorage.setItem('UsersLogin', JSON.stringify(userData));
    window.location.reload();
}*/
/*
function loginUser() {
    const loginUsername = document.getElementById('login-username').value
    const loginPass = document.getElementById('login-pass').value
    if (localStorage.getItem('UsersLogin')) {
        const loginDeets = JSON.parse(localStorage.getItem('UsersLogin'))
        if (loginEmail === loginDeets.email && loginPass === loginDeets.password) {
            console.log('Ingreso exitoso')
        } else {
            console.log('Ingreso fallido')
        }
    } else {
        console.log('Sin usuarios logueados')
    }
}
*/
let usuarioLogueado = false

inicio();

function inicio() {
    eventos()
    mostrarBotonera();
}

function eventos() {
  dqs("navInicio").addEventListener("click", mostrarInicio);
  dqs("navIngreso").addEventListener("click", mostrarIngreso);
  dqs("navCerrarSesion").addEventListener("click", cerrarSesion);
  dqs("btnIngreso").addEventListener("click", mostrarInicio);
}

function mostrarInicio() {
    mostrarBotonera();
    dqs("inicio").style.display = "block";
    if(UsersLogin) {
        dqs("divInicioUsuarioDesconocido").style.display = "none";
        dqs("divInicioUsuarioLogueado").style.display = "block";
    }else{
        dqs("divInicioUsuarioDesconocido").style.display = "block";
        dqs("divInicioUsuarioLogueado").style.display = "none";
    }
}

function mostrarIngreso() {
    mostrarBotonera();
    dqs("login").style.display = "block";
}

function cerrarSesion() {
    usuarioLogueado = false;
    dqs('btnCerrarSesion').style.display = 'block'
    inicio();
}

function mostrarBotonera() {
    if(!usuarioLogueado){
        dqs("menu").style.display = "block";
        dqs("navInicio").style.display = "block";
        dqs("navIngreso").style.display = "block";
        dqs("navCerrarSesion").style.display = "none";
    }else{
        dqs("menu").style.display = "block";
        dqs("navInicio").style.display = "block";
        dqs("navIngreso").style.display = "none";
        dqs("navCerrarSesion").style.display = "block";
    }
}

function dqs(id) {
    return document.querySelector("#"+id);
}

