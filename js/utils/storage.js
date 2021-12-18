const tokenKey = "token";
const userKey = "user";

let items = [];
export function saveToStorage(key, value) {
  if (!getStorageItem(key)) {
    localStorage.setItem(key, JSON.stringify(items));
  }
  items = JSON.parse(localStorage.getItem(key));

  items.push(value);
  localStorage.setItem(key, JSON.stringify(items));
}

export function saveToken(token) {
  saveAdmin(tokenKey, token);
}

function saveAdmin(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveUser(user) {
  saveAdmin(userKey, user);
}

export function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeUser(key) {
  localStorage.removeItem(key);
}

export function removeItem(product) {
  var items = JSON.parse(localStorage.getItem("product"));
  for (var i = 0; i < items.length; i++) {
    var object = items[i];
    if (object.id === product.id) {
      items.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("product", JSON.stringify(items));
}
