import { getProducts } from "./utils/getProducts.js";

const productsContainer = document.querySelector(".productsContainer");

const search = document.querySelector(".searchProducts");

const products = await getProducts();

displayProducts(products);
searchProducts(products);

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `<div class="product">
      <a href="productDetail.html"
      ><img src="http://localhost:1337${product.image.formats.large.url}" alt=""
      /></a>
      <p class="productTitle">${product.title}</p>
      <p class="productPrice">$${product.price}</p>
      <a href="productDetail.html" class="productButtons" id="moreButton"
      >View Product</a
      >
      <br />
      <a href="" class="productButtons" id="cartButton">Add To Cart</a>
      </div>`;
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
