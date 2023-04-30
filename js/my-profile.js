let profile = [];

document.addEventListener("DOMContentLoaded", function (e) {
  let email = localStorage.getItem("email");

  if (email == null) {
    window.location = "login.html";
  } else {
    document.getElementById("mail-usuario").innerHTML = email;
    document.getElementById("userLabel").innerHTML = email;
  }

  document.getElementById("perfil").addEventListener("click", function () {
    window.location = "my-profile.html";
  });

  document.getElementById("carrito").addEventListener("click", function () {
    window.location = "cart.html";
  });

  document
    .getElementById("cerrarSesion")
    .addEventListener("click", function () {
      localStorage.clear();
      profile.clear();
      window.location = "login.html";
    });

  let form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (form.checkValidity()) {
      form.classList.add("was-validated");

      let profileName = document.getElementById("name1").value;

      //    let profilePastName = document.getElementById("pastName").value;

      let profileSurname = document.getElementById("surname").value;

      //    let profileSurname2 = document.getElementById("surname2").value;

      let profileEmail = document.getElementById("userPlHl").value;

      //    let profilePhone = document.getElementById("phone").value;

      if (
        profileName !== null &&
        //      !profilePastName == null &&
        profileSurname !== null &&
        //      !profileSurname2 == null &&
        profileEmail !== null // &&
        //      !profilePhone == null
      ) {
        profile = [];
        profile.push(profileName);
        profile.push(profileSurname);
        profile.push(profileEmail);

        if (localStorage.getItem("Profile") !== null) {
          localStorage.deleteItem("Profile");
        }
        localStorage.setItem("Profile", JSON.stringify(profile));
      }
    }

    let event = ["change", "input"];

    event.forEach((e) => {
      document.form.addEventListener(e, validation);
    });
  });

  if (localStorage.getItem("Profile") !== null) {
    profile = JSON.parse(localStorage.getItem("Profile"));
    console.log(profile);
    document.getElementById("name").innerHTML = `Nombre: ${profile[0]}`;
    document.getElementById(
      "surnameLabel"
    ).innerHTML = `Apellido: ${profile[1]}`;
    document.getElementById("userLabel").innerHTML = `E-mail: ${profile[2]}`;
  }

  // document
  //   .getElementById("BtnChangePrlImage")
  //   .addEventListener("click", function () {});
  let profilePicture = localStorage.getItem("pfp");
  if (profilePicture !== null) {
    document.getElementById("imgsrc").src = JSON.parse(
      localStorage.getItem("ProfilePic")
    );
  }
});

function validation() {
  let email = localStorage.getItem("email");
  let emailValidity =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  valid = true;

  if (emailValidity.test(email.value)) {
    email.setCustomValidity("");
  } else {
    email.setCustomValidity(false);
    valid = false;
  }

  return valid;
}

//PROFILE PICTURE

document.getElementById("file").addEventListener("change", () => {
  let fileSelected = document.getElementById("file").files;

  if (fileSelected.lenght > 0) {
    //= 0 && fileSelected.lenght !== -1)) {
    let fileToLoad = fileSelected[0];

    let fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      let srcData = fileLoadedEvent.target.result;

      localStorage.setItem("ProfilePic", JSON.stringify(srcData));
    };
    fileReader.readAsDataURL(fileToLoad);
  }
});
