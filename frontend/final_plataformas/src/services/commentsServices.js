import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export const addComment = async (comentario, valoracion, recetaId) => {
    try {
        const response = await axios.post(`${API_URL}comentarios`, { comentario, valoracion, recetaId });
        console.log("Respuesta desde el backend:", response.data);
    } catch (error) {
        console.error("Error al guardar el comentario:", error);
    }
}