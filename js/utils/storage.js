const tokenKey = "token";

let items = [];
export function saveToStorage(key, value) {
  items = JSON.parse(localStorage.getItem(key));

  items.push(value);
  localStorage.setItem(key, JSON.stringify(items));
}

export function clearStorage() {
  localStorage.clear();
}

export function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
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

export function getStorage() {
  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return JSON.parse(values);
}
