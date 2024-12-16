import axios from "axios";

const API_URL = "http://localhost:3000/api";

const commentsService = {
    async getComments() {
        try {
          const response = await axios.get(`${API_URL}/comentarios`);
          return response.data;
        } catch (error) {
          console.error(
            "Error al obtener los comentarios:",
            error.response?.data || error.message
          );
          throw error;
        }
    }
};

export default commentsService;

