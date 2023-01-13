console.log("Image Preview");

const imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById("image-preview");
    preview.src = reader.result;
  };
  reader.readAsDataURL(imageInput.files[0]);
});
