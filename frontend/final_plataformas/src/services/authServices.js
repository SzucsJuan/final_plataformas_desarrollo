import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);  // Guardamos el token
      return response.data;
    }
  } catch (error) {
    console.error("Error de autenticación", error);
    throw error;
  }
};
