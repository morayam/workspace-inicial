let userData;
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
  location.reload()
}

let usuarioLogueado = false;

inicio();

function inicio() {
    eventos()
    ocultarTodo();
    mostrarBotonera();
}

function eventos() {
    dqs("navInicio").addEventListener("click", mostrarUInicio);
    dqs("navIngreso").addEventListener("click", mostrarUIngreso);
    dqs("navCerrarSesion").addEventListener("click", cerrarSesion);
}

function ocultarTodo() {
    //menu (navbarNav): inicio y login
    dqs("menu").style.display = "none";
    dqs("inicio").style.display = "none";
    dqs("login").style.display = "none";
}

function mostrarUInicio() {
    ocultarTodo();
    mostrarBotonera();
    dqs("inicio").style.display = "block";
    if(usuarioLogueado) {
        dqs("divInicioUsuarioDesconocido").style.display = "none";
        dqs("divInicioUsuarioLogueado").style.display = "block";
    }else{
        dqs("divInicioUsuarioDesconocido").style.display = "block";
        dqs("divInicioUsuarioLogueado").style.display = "none";
    }
}

function mostrarUIngreso() {
    ocultarTodo();
    mostrarBotonera();
    dqs("login").style.display = "block";
}

function cerrarSesion() {
    usuarioLogueado = false;
    inicio();
}

function mostrarBotonera() {
    if(!usuarioLogueado){
        dqs("menu").style.display = "block";
        dqs("btnInicio").style.display = "block";
        dqs("btnIngreso").style.display = "block";
        dqs("btnCerrarSesion").style.display = "none";
    }else{
        dqs("menu").style.display = "block";
        dqs("btnInicio").style.display = "block";
        dqs("btnIngreso").style.display = "none";
        dqs("btnCerrarSesion").style.display = "block";
    }
}

function dqs(id) {
    return document.querySelector("#"+id);
}

