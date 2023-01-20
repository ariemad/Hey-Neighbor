function updateImage() {
  var input = document.getElementById("image-input");
  var image = document.getElementById("image-preview");
  if (input.value) {
    image.src = URL.createObjectURL(input.files[0]);
  } else {
    image.src = "";
  }
}

let inputButton = document.getElementById("image-input");
inputButton.addEventListener("change", updateImage);
