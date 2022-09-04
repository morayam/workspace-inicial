function login() {

  
  // else {

  // }
}

document.addEventListener('DOMContentLoaded', () => {

  let loginForm = document.getElementById("login-info");

  //Se agrega una escucha en el evento 'submit' que será
  //lanzado por el formulario cuando se seleccione 'Vender'.
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("login-username");
    let pw = document.getElementById("login-pass");
    let infoMissing = false;
  
    if (email.value === "") {
      email.classList.add('is-invalid');
      infoMissing = true;
    } else {
      email.classList.remove('is-invalid');
      infoMissing = false;
    }
  
    if (pw.value === "") {
      pw.classList.add('is-invalid');
      infoMissing = true;
    } else {
      pw.classList.remove('is-invalid');
      infoMissing = false;
    }
  
    if (!infoMissing) {
      localStorage.setItem('email', email.value);
      location.href = 'index.html';
    }

  });
});
