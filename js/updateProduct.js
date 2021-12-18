import { addData } from "./productConfig.js";
const updateForm = document.querySelector("#update");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const queryString = document.location.search;

  const params = new URLSearchParams(queryString);

  const id = params.get("id");

  const token = localStorage.getItem("token");
  const request = new XMLHttpRequest();

  const formData = new FormData(e.target);

  const formElements = updateForm.elements;

  addData(formElements, formData);

  request.open("PUT", "http://localhost:1337/products/" + id);
  request.setRequestHeader("Authorization", "Bearer " + JSON.parse(token));
  request.send(formData);
});
