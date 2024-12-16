import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const usersService = {
  async getUsers(token) {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener usuarios:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async deleteUser(userId, token) {
      try {
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(
          "Error al eliminar usuario:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
  
    async updateUser(usersId, updatedData, token) {
      try {
        const response = await axios.put(
          `${API_URL}/users/${usersId}`,
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
          "Error al actualizar usuario:",
          error.response?.data || error.message
        );
        throw error;
      }
    }
};

export default usersService;
