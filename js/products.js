import { getProducts } from "./utils/getProducts.js";
import { addToCart } from "./utils/getProducts.js";

const productsContainer = document.querySelector(".productsContainer");

const search = document.querySelector(".searchProducts");

const products = await getProducts();

displayProducts(products);
searchProducts(products);

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `<div class="product">
      <a href="productDetail.html?id=${product.id}"
      ><img src="http://localhost:1337${product.image.formats.large.url}" alt=""
      /></a>
      <p class="productTitle">${product.title}</p>
      <p class="productPrice">$${product.price}</p>
      <a href="productDetail.html?id=${product.id}" class="productButtons" id="moreButton"
      >View Product</a
      >
      <br />
      <a class="productButtons" id="cartButton" data-item="${product.id}">Add To Cart</a>
      </div>`;
  });
  const btns = document.querySelectorAll(".productButtons");

  btns.forEach(function (id) {
    id.addEventListener("click", function () {
      const pro = products.find(
        (p) => p.id === parseInt(event.target.dataset.item)
      );
      if (pro) {
        addToCart(
          products.find((p) => p.id === parseInt(event.target.dataset.item))
        );
      }
    });
  });
}

function searchProducts(products) {
  search.onkeyup = function () {
    const searchValue = event.target.value.toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().startsWith(searchValue) ||
        product.description.toLowerCase().startsWith(searchValue)
      ) {
        return true;
      }
    });
    if (searchValue) {
      displayProducts(filteredProducts);
    } else {
      displayProducts(products);
    }
  };
}
