export function ErreurEmail(Email) {
  let mailRegister = document.getElementById("Erreur-Form");

  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;

  if (Email.match(regex)) {
    return true;
  } else {
    mailRegister.innerHTML = "Le format du mail est incorrect";
    mailRegister.style.color ="red";
    mailRegister.style.textAlign="center"
    return false;
  }
}

export function ErreurChampObligatoire() {
  let formMsg = document.getElementById("Erreur-Form");
  formMsg.innerHTML = "Merci de remplir correctement tous les champs";
  formMsg.style.color ="red";
  formMsg.style.textAlign="center"
}

export function ErreurChampObligatoireComment() {
  let formMsg = document.getElementById("Erreur-Com");
  formMsg.innerHTML = "Merci de remplir correctement tous les champs";
  formMsg.style.color ="red";
  formMsg.style.textAlign="center"
}

export function ErreurPassword(Password) {
  let password = document.getElementById("Erreur-Form");

  let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

  if (Password.match(regex)) {
    return true;
  } else {
    password.innerHTML = "Mots de passe incorrect";
    password.style.color ="red";
    password.style.textAlign="center"
    return false;
  }
}
