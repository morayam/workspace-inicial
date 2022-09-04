document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    
    document.getElementById("navCerrarSesion").addEventListener("click", function () {
        localStorage.clear();
        window.location = "login.html"
    });

    let email = localStorage.getItem('email');
    if (email == null)  {
        window.location = 'login.html';
    } else {
        document.getElementById('mail-usuario').innerHTML = email;
    }

});