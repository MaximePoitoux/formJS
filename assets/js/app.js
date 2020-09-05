// SELECT ALL ELEMENTS FROM DOM
const hamburgerIcon = document.querySelector(".hamburger_icon"); // HAMBURGER ICON
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav"); // NAVBAR
const span = document.querySelector(".color_span") // SPAN
const checkbox = document.querySelector("#checkbox"); // CHECKBOX
const form = document.querySelector("#form"); // FORM
const username = document.querySelector("#username"); // INPUT
const email = document.querySelector("#email"); // INPUT
const password = document.querySelector("#password"); // INPUT
const passwordCheck = document.querySelector("#passwordCheck"); // INPUT
const countElement = document.querySelector("#count"); // COUNT VIEWS

hamburgerIcon.addEventListener("click", () => {
    nav.classList.toggle("nav_open");
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
})

checkbox.addEventListener("change", () => {
    // CHANGE THE THEME OF THE WEBSITE
    document.body.classList.toggle("dark");
    document.querySelector(".color_span").classList.toggle("newColorSpan");
    menu.classList.toggle("newColorMenu");
    menu.querySelector("h1").classList.toggle("newColorH2");
    document.querySelector("#submit").classList.toggle("newColorSubmit");
    document.querySelector(".countContainer").classList.toggle("newColorCountContainer");
})

function checkInputs() {
    // GET THE VALUES FROM THE INPUTS
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim();

    if(usernameValue === "") {
        // SHOW ERROR
        // ADD ERROR CLASS
        setErrorFor(username, "Username cannot be blank");
    } else if(!isUsername(usernameValue)) {
        setErrorFor(username, "8-20 characters, no special characters")
    } else {
        // ADD SUCCESS CLASS
        setSuccessFor(username);
    }

    if(emailValue === "" ) {
        setErrorFor(email, "Email cannot be blank");
    } else if(!isEmail(emailValue)) {
        setErrorFor(email, "Email is not valid");
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, "8 characters minimum")
    } else { 
        setSuccessFor(password);
    }

    if(passwordCheckValue === "") {
        setErrorFor(passwordCheck, "Password cannot be blank");
    } else if(passwordValue !== passwordCheckValue) {
        setErrorFor(passwordCheck, "Passwords doesn't match");
    } else {
        setSuccessFor(passwordCheck);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; // .formControl
    const small = formControl.querySelector("small");

    // ADD ERROR MESSAGE INSIDE SMALL
    small.innerText = message;

    // ADD ERROR CLASS 
    formControl.className = "formControl error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    // ADD SUCCESS CLASS
    formControl.className = "formControl success";
}

// REGEX FOR USERNAME
function isUsername(username) {
    return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
}

// REGEX FOR EMAIL
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// REGEX FOR PASSWORD
function isPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
}

updateVisitCount();

function updateVisitCount() {
    fetch("https://api.countapi.xyz/update/maxime/maxime/?amount=1")
    .then(res => res.json())
    .then(res => {
        countElement.innerHTML = res.value;
    })
}