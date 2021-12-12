import { addToCart } from "./utils/getProducts.js";
import { baseUrl } from "./settings/api.js";

const productContainer = document.querySelector(".detailMain");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

fetchProduct();

export async function fetchProduct() {
  const url = baseUrl + "products/" + id;

  const response = await fetch(url);

  const product = await response.json();
  try {
    productContainer.innerHTML = "";

    productContainer.innerHTML = `<img src="http://localhost:1337${product.image.formats.large.url}" alt="" />
      <p class="detailTitle">${product.title}</p>
      <p class="detailPrice">$${product.price}</p>
      <div class="size">
        <label for="size">Choose Size:</label>
        <select name="size">
          <option>5</option>
          <option>5.5</option>
          <option>6</option>
          <option>6.5</option>
          <option>7</option>
          <option>7.5</option>
          <option>8</option>
          <option>8.5</option>
          <option>9</option>
          <option>9.5</option>
        </select>
      </div>
      <a class="addToCartBtn"data-item="${product.id}">Add To Cart</a>
      <p class="detailDescription">
        ${product.description}
      </p>`;

    const btn = document.querySelector(".addToCartBtn");

    btn.addEventListener("click", function () {
      addToCart(product);
    });
  } catch (error) {
    console.log("error");
  }
}
