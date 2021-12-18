import { getProducts } from "./utils/getProducts.js";
import { baseUrl } from "./settings/api.js";

const heroImage = document.querySelector(".heroImage");

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

displayHeroImage();

async function displayHeroImage() {
  const url = baseUrl + "home";
  try {
    const response = await fetch(url);

    const page = await response.json();

    heroImage.innerHTML = "";

    heroImage.innerHTML += `<img src="http://localhost:1337${page.hero_banner.url}" class="heroImg" alt="" />`;
  } catch (error) {
    console.log("error");
  }
}
