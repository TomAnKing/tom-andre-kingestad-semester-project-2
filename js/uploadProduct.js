import { getProducts } from "./utils/getProducts.js";
import { addData } from "./productConfig.js";

const uploadForm = document.querySelector("#upload");

const productsContainer = document.querySelector(".productsContainer");
const products = await getProducts();
displayProducts(products);

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const request = new XMLHttpRequest();

  const formData = new FormData(e.target);

  const formElements = uploadForm.elements;

  addData(formElements, formData);

  request.open("POST", `http://localhost:1337/products`);

  request.setRequestHeader("Authorization", "Bearer " + JSON.parse(token));
  request.send(formData);
  setTimeout(function () {
    location.reload();
  }, 800);
});

const btns = document.querySelectorAll(".productButtons");

btns.forEach(function (id) {
  id.addEventListener("click", function (e) {
    const pro = products.find(
      (p) => p.id === parseInt(event.target.dataset.item)
    );
    if (pro) {
      const token = localStorage.getItem("token");
      const request = new XMLHttpRequest();

      const id = parseInt(e.target.dataset.item);

      console.log("here");

      request.open("DELETE", "http://localhost:1337/products/" + id);

      request.setRequestHeader("Authorization", "Bearer " + JSON.parse(token));

      if (confirm("Are you sure you want delete this product")) {
        request.send();
        setTimeout(function () {
          location.reload();
        }, 10);
      }
    }
  });
});

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `<div class="product">
      <a href="updateProduct.html?id=${product.id}">
      <img src="http://localhost:1337${product.image.formats.large.url}" alt="${product.image.alternativeText}"/>
      </a>
      <p class="productTitle">${product.title}</p>
      <p class="productPrice">$${product.price}</p>
      <a href="updateProduct.html?id=${product.id}" class="productButtons" id="moreButton"
      >Edit Product</a
      >
      <br />
      <a class="productButtons" id="cartButton" data-item="${product.id}">Delete Product</a>
      </div>`;
  });
}
