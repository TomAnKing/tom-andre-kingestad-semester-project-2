import { getProducts } from "./utils/getProducts.js";
import { getStorageItem } from "./utils/storage.js";
import { removeItem } from "./utils/storage.js";

const products = await getProducts();

const cartContainer = document.querySelector(".cartGrid");

const cartTotal = document.querySelector(".totalCart");

displayStorage();

function displayStorage() {
  cartContainer.innerHTML = "";
  let total = 0;
  cartTotal.innerHTML = "";

  const products = filterArray();

  products.forEach((product) => {
    total += parseFloat(product.price);

    const number = getStorageItem("product").filter(
      (p) => p.id === product.id
    ).length;

    cartContainer.innerHTML += ` <div class="cartProduct">
    <a href="productDetail.html?id=${product.id}">
    <img src="http://localhost:1337${product.image.formats.large.url}" alt=""/>
    </a>
    <div class="productInfo">
    <p class="cartTitle"> ${number}x ${product.title}</p>
    <p class="cartPrice">$${product.price}</p>
    <a href="productDetail.html?id=${product.id}">View Product</a>
    <i class="fas fa-trash-alt" data-item="${product.id}"></i>
    </div>
    </div>`;
  });
  cartTotal.innerHTML += `
  <h2 class="cartTotal">
  Total Price:<span class="totalPrice">$${totalPrice()}</span>
  </h2>`;
  const trashcans = document.querySelectorAll("i");
  trashcans.forEach((trashcan) => {
    trashcan.addEventListener("click", function () {
      const product = products.find(
        (p) => p.id === parseInt(event.target.dataset.item)
      );
      removeItem(product);
      displayStorage();
    });
  });
}

// removes duplicates
function filterArray() {
  const obj = {};
  let arr = getStorageItem("product");

  for (let i = 0, len = arr.length; i < len; i++) {
    obj[arr[i]["id"]] = arr[i];
  }
  arr = new Array();
  for (const key in obj) {
    arr.push(obj[key]);
  }
  return arr;
}

function totalPrice() {
  let num = 0;
  getStorageItem("product").forEach((p) => {
    num += parseFloat(p.price);
  });

  return num.toFixed(2);
}
