document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("navCerrarSesion").addEventListener("click", function () {
        localStorage.clear();
        window.location = "login.html"
    });

    let email = localStorage.getItem('email');
    if (email == null) {
        window.location = 'login.html';
    } else {
        document.getElementById('mail-usuario').innerHTML = email;
    }
})