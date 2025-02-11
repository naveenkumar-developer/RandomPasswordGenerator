// ACCESS NECESSARY ELEMENTS FROM HTML
const displayPassword = document.getElementById("password_display_box");
const generate_passwordBtn = document.getElementById("generateBtn");
const regenerate_passwordBtn = document.getElementById("regenerateBtn");
const copy_passwordBtn = document.getElementById("copy_password");

//ACCESS ModalS FOR ERROR HANDLING

const copyErrorModalBox = document.getElementById("copyErrorModal");
const passwordLengthErrorModalBox = document.getElementById(
  "passwordLengthErrorModal"
);
const successModalBox = document.getElementById("successModal");

//ACCESS CLOSE BUTTONS FOR ALL Modal BOXES
let closeModalBtn = document.querySelectorAll(".closeButton");
closeModalBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.parentNode.classList.remove("showModal");
    btn.parentNode.classList.add("hideModal");
    document.body.classList.remove("no_interAction");
  });
});

function generatePassword() {
  const passwordLength = parseInt(document.getElementById("length").value); // Get password length as number
  const isLowercase = document.getElementById("lowercase").checked;
  const isUppercase = document.getElementById("uppercase").checked;
  const isNumber = document.getElementById("number").checked;
  const isSymbols = document.getElementById("symbols").checked;

  const Uppercase_Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const Lowercase_Alpha = "abcdefghijklmnopqrstuvwxyz".split("");
  const numbers = "0123456789".split("");
  const symbols = "!@#$%&^*".split("");

  let password = [];
  let allCharacters = [];
  if (passwordLength >= 8 && passwordLength <= 20) {
    if (isUppercase) {
      password.push(
        Uppercase_Alpha[Math.floor(Math.random() * Uppercase_Alpha.length)]
      );
      allCharacters = allCharacters.concat(Uppercase_Alpha);
    }

    if (isLowercase) {
      password.push(
        Lowercase_Alpha[Math.floor(Math.random() * Lowercase_Alpha.length)]
      );
      allCharacters = allCharacters.concat(Lowercase_Alpha);
    }

    if (isNumber) {
      password.push(numbers[Math.floor(Math.random() * numbers.length)]);
      allCharacters = allCharacters.concat(numbers);
    }

    if (isSymbols) {
      password.push(symbols[Math.floor(Math.random() * symbols.length)]);
      allCharacters = allCharacters.concat(symbols);
    }

    // If no option is selected, return an error message
    if (allCharacters.length === 0) {
      displayPassword.innerText = "Select at least one option.";
      return;
    }

    // Fill the remaining characters randomly
    while (password.length < passwordLength) {
      let random_char =
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
      password.push(random_char);
    }

    // Shuffle the password to make it more random
    password = password.sort(() => Math.random() - 0.5);

    // Display the generated password
    displayPassword.innerText = password.join("");
  } else {
    passwordLengthErrorModalBox.classList.remove("hideModal");
    passwordLengthErrorModalBox.classList.add("showModal");
    document.body.classList.add("no_interAction");
  }
}

// Attach event listeners to buttons
generate_passwordBtn.addEventListener("click", generatePassword);
regenerate_passwordBtn.addEventListener("click", generatePassword);

copy_passwordBtn.addEventListener("click", function () {
  if (displayPassword.innerText === "") {
    copyErrorModalBox.classList.remove("hideModal");
    copyErrorModalBox.classList.add("showModal");
    document.body.classList.add("no_interAction");
  } else {
    navigator.clipboard.writeText(displayPassword.innerText);
    successModalBox.classList.remove("hideModal");
    successModalBox.classList.add("showModal");
    document.body.classList.add("no_interAction");
  }
});
