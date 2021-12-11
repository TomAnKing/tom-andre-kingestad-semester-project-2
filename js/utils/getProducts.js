import { baseUrl } from "../settings/api.js";

const productKey = "product";

export async function getProducts(filterFeatured) {
  const url = baseUrl + "products";
  try {
    const response = await fetch(url);

    const products = await response.json();
    if (filterFeatured) {
      const productsToShow = products.filter((p) => {
        return p.featured === true;
      });
      return productsToShow;
    } else {
      return products;
    }
  } catch (error) {
    console.log("error");
  }
}

export function addToCart(product) {
  saveToStorage(productKey, product);
}
