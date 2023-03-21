import { Validator } from "./class/Validator.js";
import { Birth } from "./class/Birth.js";
import error from "../db/server-error.json" assert { type: "json" };

let validator = new Validator();
let birht = new Birth();

let form = document.getElementById("form");

let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
let mail = document.getElementById("mail");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

let selectDay = document.getElementById("selectDay");
let selectMonth = document.getElementById("selectMonth");
let selectYear = document.getElementById("selectYear");

let gender = document.querySelectorAll('input[type="radio"]');

let selectNationality = document.getElementById("nationality");

let popup = document.querySelector(".popup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  checkInputs();
  if (validator.getResult() === true) {
    formSubmission()
  }
});

function formSubmission() {
  let http = new XMLHttpRequest();
  http.open("get", "../db/server-ok.json", true);
  http.send();
  http.onload = function () {
    if ( http.readyState == 4 &&  http.status == 200) {
      console.log(' ok',  http.readyState)
      form.reset();
      showPupupOk();
    } else {
      console.log(' err',  http.readyState)
      form.reset();
      showPupupError(error);
    }
  };
}
popup.addEventListener("click", () => {
  form.classList.remove("none");
  popup.classList.add("none");
});

function showPupupOk() {
  form.classList.add("none");
  popup.classList.remove("none");
}

function showPupupError(error) {
  let messages = document.querySelector(".wrapper_messages");
  form.classList.add("none");
  popup.classList.remove("none");
  messages.innerHTML = `<p class="popup_title">${error[0].message}</p>`;
}

function checkInputs() {
  validator.setLastName(lastName.value);
  validator.setFirstName(firstName.value);
  validator.setEmail(mail.value);
  validator.setPassword(password.value);
  validator.setConfirmPassword(confirmPassword.value);

  showError(validator.getLastName(), lastName);
  showError(validator.getFirstName(), firstName);
  showError(validator.getEmail(), mail);
  showError(validator.getPassword(), password);
  showError(validator.getConfirmPassword(), confirmPassword);
}

function showError(result, elem) {
  let messageError = document.getElementById(`error-${elem.id}`);
  if (result === true) {
    messageError.textContent = "";
    elem.classList.contains("red") ? elem.classList.remove("red") : false;
  } else {
    elem.classList.add("red");
    messageError.classList.remove("none");
    messageError.textContent = result;
  }
}
function showNationality() {
  const nationalitys = ["American", "Australian", "Argentine", "Belarusian"];
  for (let i = 0; i < nationalitys.length; i++) {
    let optionNationality = document.createElement("option");
    optionNationality.setAttribute("value", nationalitys[i]);
    optionNationality.textContent = nationalitys[i];
    selectNationality.append(optionNationality);
  }
}

function showDay(num) {
  selectDay.innerHTML = "";
  for (let i = 1; i <= num; i++) {
    let optionDay = document.createElement("option");
    optionDay.textContent = i;
    selectDay.append(optionDay);
  }
  selectDay.value = birht.getDay();
}

function showMonth() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (let i = 0; i < months.length; i++) {
    let optionMonth = document.createElement("option");
    optionMonth.setAttribute("value", i + 1);
    optionMonth.textContent = months[i];
    selectMonth.append(optionMonth);
  }
}

function showYear() {
  let oldYear = birht.year;
  for (let i = oldYear; i < 2020; i++) {
    let optionYear = document.createElement("option");
    optionYear.textContent = i;
    selectYear.append(optionYear);
  }
}

showDay(birht.getNumberOfDays());
showMonth();
showYear();
showNationality();
gender[0].checked = true;

selectYear.addEventListener("change", function () {
  birht.setYear(+this.value);
  showDay(birht.getNumberOfDays());
});

selectMonth.addEventListener("change", function () {
  birht.setMonth(+this.value);
  showDay(birht.getNumberOfDays());
});

selectDay.addEventListener("change", function () {
  birht.setDay(+this.value);
});
