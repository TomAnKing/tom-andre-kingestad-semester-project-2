import { getProducts } from "./utils/getProducts.js";

const featuredProducts = document.querySelector(".featuredProducts");

async function displayFeatured() {
  const products = await getProducts(true);
  featuredProducts.innerHTML = "";
  products.forEach((product) => {
    featuredProducts.innerHTML += `
    <div class="featuredProduct">
        <a href="productDetail.html?id=${product.id}">
            <img src="http://localhost:1337${product.image.formats.large.url}" alt="" />
            <p class="featuredTitle">${product.title}</p>
            <p class="featuredPrice">$${product.price}</p>
        </a>
    </div>`;
  });
}

displayFeatured();
