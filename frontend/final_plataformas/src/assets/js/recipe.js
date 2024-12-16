import recipeService from "../../services/recipeServices";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const uploadButton = document.getElementById("subirReceta");
  const nombre = document.getElementById("nombre");
  const tiempo_coccion = document.getElementById("tiempo_coccion");
  const ingredientes = document.getElementById("ingredientes");
  const descripcion = document.getElementById("descripcion");
  //const imagen = document.getElementById('imagen');
  const btnListadoRecetas = document.getElementById("btnListadoRecetas");

  const token = localStorage.getItem("token");

  if (!token) {
    alert("No estás autenticado. Por favor, inicia sesión.");
    window.location.href = "/login.html";
  }

  uploadButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const recipeData = {
      nombre: nombre.value,
      tiempo_coccion: tiempo_coccion.value,
      ingredientes: ingredientes.value,
      descripcion: descripcion.value,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await recipeService.addRecipe(recipeData, token);
      console.log("Receta agregada:", response);
      form.reset();
    } catch (error) {
      console.log("Error al agregar la receta:", error);
    }
  });

  btnListadoRecetas.addEventListener("click", () => {
    window.location.href = "listado_recetas.html";
  });
});
