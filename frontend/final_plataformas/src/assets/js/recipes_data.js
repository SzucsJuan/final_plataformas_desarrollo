import recipeService from "../../services/recipeServices";

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const tableBody = document.querySelector("table tbody");

  if (!token) {
    console.log("No estás autenticado. Por favor, inicia sesión.");
    window.location.href = "/login.html";
    return;
  }

  try {
    const recetas = await recipeService.getRecetas(token);
    // console.log("Recetas obtenidas:", recetas);

    tableBody.innerHTML = "";

    recetas.forEach((receta) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td class="hidden">${receta.id}</td>
                <td>${receta.nombre}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-2" onclick="editarReceta(${receta.id}, '${receta.nombre}')">✏️</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarReceta(${receta.id})">🗑️</button>
                </td>
            `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    tableBody.innerHTML = `
            <tr>
                <td colspan="3">Error al cargar las recetas. Inténtalo más tarde.</td>
            </tr>
        `;
  }
});

async function eliminarReceta(recipeId) {
  const token = localStorage.getItem("token");

  if (!confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
    return;
  }

  try {
    await recipeService.deleteRecipe(recipeId, token);
    alert("Receta eliminada con éxito.");
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar receta:", error);
    alert("Error al eliminar la receta. Inténtalo nuevamente.");
  }
}

async function editarReceta(
  recipeId,
  currentNombre,
  currentTiempo,
  currentIngredientes,
  currentDescripcion
) {
  const token = localStorage.getItem("token");

  const nuevoNombre = prompt("Edita el nombre de la receta:", currentNombre);
  const nuevoTiempo = prompt(
    "Edita el tiempo de cocción de la receta:",
    currentTiempo
  );
  const nuevoIngredientes = prompt(
    "Edita los ingredientes de la receta:",
    currentIngredientes
  );
  const nuevaDescripcion = prompt(
    "Edita la descripción de la receta:",
    currentDescripcion
  );

  if (!nuevoNombre || nuevoNombre.trim() === "") {
    alert("El nombre no puede estar vacío.");
    return;
  }

  const updatedData = {
    nombre: nuevoNombre,
    tiempo_coccion: nuevoTiempo,
    ingredientes: nuevoIngredientes,
    descripcion: nuevaDescripcion,
  };

  console.log("Datos actualizados:", updatedData);

  try {
    await recipeService.updateRecipe(recipeId, updatedData, token);
    alert("Receta actualizada con éxito.");
    window.location.reload();
  } catch (error) {
    console.error("Error al actualizar receta:", error);
    alert("Error al actualizar la receta. Inténtalo nuevamente.");
  }
}

window.eliminarReceta = eliminarReceta;
window.editarReceta = editarReceta;
