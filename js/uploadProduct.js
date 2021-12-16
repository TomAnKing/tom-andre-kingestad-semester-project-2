import { getProducts } from "./utils/getProducts.js";
import { addData } from "./productConfig.js";

const uploadForm = document.querySelector("#upload");

const productsContainer = document.querySelector(".productsContainer");

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
});

const products = await getProducts();

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `<div class="product">
      <a href="updateProduct.html?id=${product.id}">
      <img src="http://localhost:1337${product.image.formats.large.url}" alt=""/>
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

displayProducts(products);
