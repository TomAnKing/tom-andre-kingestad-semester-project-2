export function addData(elements, formData) {
  const data = {};
  for (let i = 0; i < elements.length; i++) {
    const currentElement = elements[i];
    if (!["submit", "file"].includes(currentElement.type)) {
      if (currentElement.type === "checkbox") {
        const checkValue = currentElement.checked;
        data[currentElement.name] = checkValue;
      } else {
        data[currentElement.name] = currentElement.value;
      }
    } else if (currentElement.type === "file") {
      for (let i = 0; i < currentElement.files.length; i++) {
        const file = currentElement.files[i];
        formData.append(`files.${currentElement.name}`, file, file.name);
      }
    }
  }
  formData.append("data", JSON.stringify(data));
}
