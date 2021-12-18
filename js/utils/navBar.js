import { getStorageItem } from "./storage.js";
import { removeUser } from "./storage.js";

const navBar = document.querySelector(".navbar-nav");

const user = getStorageItem("user");

const isAdminPage =
  window.location.pathname === "/uploadProducts.html" ||
  window.location.pathname === "/updateProduct.html";

if (user) {
  navBar.innerHTML += `<li class="nav-item">
  <a class="nav-link ${isActive()}" href="uploadProducts.html">Admin</a>
  </li>`;
}
function isActive() {
  if (isAdminPage) {
    return "active";
  }
}

const signIn = document.getElementById("SignIn");
window.onload = function () {
  if (user) {
    signIn.innerHTML = `<a class="nav-link" id="SignIn">Sign Out</a>`;
    signIn.addEventListener("click", function () {
      removeUser("user");
      if (isAdminPage) {
        window.location = "index.html";
      } else {
        window.location.reload();
      }
    });
  }
};
