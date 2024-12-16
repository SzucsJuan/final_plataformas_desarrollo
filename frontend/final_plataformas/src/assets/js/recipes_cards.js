import recipeService from "../../services/recipeServices";

document.addEventListener("DOMContentLoaded", async () => {
    const recetasContainer = document.querySelector(".recetas-container");
    const token = localStorage.getItem("token"); 

    try {
        const recetas = await recipeService.getRecipes(token);

        if (recetas && recetas.length > 0) {
            recetas.forEach((receta) => {
                if (typeof receta.ingredientes === "string") {
                    receta.ingredientes = receta.ingredientes.split(",");
                }

                const recetaElement = document.createElement("div");
                recetaElement.classList.add("col-md-4", "mb-4");

                recetaElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${receta.imagen || "../public/images/default-recipe.jpg"}" class="card-img-top" alt="${receta.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${receta.nombre}</h5>
                            <p class="card-text mt-2"><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
                            <p class="card-text mt-2"><strong>Tiempo de cocción:</strong> ${receta.tiempo_coccion} minutos</p>
                            <p class="card-text"><strong>Preparación:</strong> ${receta.descripcion}</p>
                        </div>
                    </div>
                `;
                recetasContainer.appendChild(recetaElement);
            });
        } else {
            recetasContainer.innerHTML = `<p class="text-center">No hay recetas disponibles. ¡Agrega una nueva receta!</p>`;
        }
    } catch (error) {
        console.error("Error al cargar las recetas:", error.message);
        recetasContainer.innerHTML = `<p class="text-center text-danger">No se pudieron cargar las recetas. Intenta nuevamente más tarde.</p>`;
    }
});
