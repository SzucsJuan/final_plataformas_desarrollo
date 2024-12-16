import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

// const token = localStorage.getItem('token');
// console.log("Token recuperado:", token);

const recipeService = {
  async addRecipe(recipeData, token) {
    try {
      const response = await axios.post(`${API_URL}/recetas`, recipeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(
        "Error al agregar receta:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async deleteRecipe(recipeId, token) {
    try {
      const response = await axios.delete(`${API_URL}/recetas/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al eliminar receta:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async updateRecipe(recipeId, updatedData, token) {
    try {
      const response = await axios.put(
        `${API_URL}/recetas/${recipeId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al actualizar receta:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async getRecetas(token) {
    try {
      const response = await axios.get(`${API_URL}/recetas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener recetas:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default recipeService;
