import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";

const form = document.querySelector("#loginForm");
const userName = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector(".messageContainer");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = userName.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("Invalid values", ".messageContainer");
  }

  completeLogin(usernameValue, passwordValue);
}

async function completeLogin(username, password) {
  const url = baseUrl + "auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      window.location = "uploadProducts.html";

      saveToken(json.jwt);
      saveUser(json.user);
    }

    if (!json.jwt) {
      displayMessage("Wrong username or password", ".messageContainer");
    }
  } catch (error) {
    displayMessage("An error has occured", ".messageContainer");
  }
}
