import recipeService from "../../services/recipeServices";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const uploadButton = document.getElementById("subirReceta");
  const nombre = document.getElementById("nombre");
  const tiempo_coccion = document.getElementById("tiempo_coccion");
  const ingredientes = document.getElementById("ingredientes");
  const descripcion = document.getElementById("descripcion");
  const imagenInput = document.getElementById('imagen');
  const btnListadoRecetas = document.getElementById("btnListadoRecetas");

  const token = localStorage.getItem("token");

  if (!token) {
    alert("No estás autenticado. Por favor, inicia sesión.");
    window.location.href = "/login.html";
  }

  uploadButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!imagenInput.files[0]) {
      alert("Por favor selecciona una imagen");
      return;
    }

    const file = imagenInput.files[0];

    // Reducir el tamaño de la imagen usando canvas
    const resizeImage = (file, maxWidth, maxHeight, callback) => {
      
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let width = img.width;
          let height = img.height;

          // Calcular las dimensiones proporcionales
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir a Base64
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7); // 0.7 para compresión adicional
          callback(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    resizeImage(file, 800, 800, async (imagenBase64) => {
      const recipeData = {
        nombre: nombre.value,
        tiempo_coccion: tiempo_coccion.value,
        ingredientes: ingredientes.value,
        descripcion: descripcion.value,
        imagen: imagenBase64, // Imagen comprimida en Base64
      };

      try {
        const response = await recipeService.addRecipe(recipeData, token);
        console.log("Receta agregada:", response);
        alert("Receta agregada exitosamente.");
        form.reset();
      } catch (error) {
        console.error("Error al agregar la receta:", error);
        alert("Hubo un error al agregar la receta. Intenta nuevamente.");
      }
    });
  });

  btnListadoRecetas.addEventListener("click", () => {
    window.location.href = "listado_recetas.html";
  });
});
