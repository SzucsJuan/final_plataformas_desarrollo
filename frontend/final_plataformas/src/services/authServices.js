import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Respuesta desde el backend:", response.data);
    
    if (response.data && response.data.token) {
      console.log("Datos recibidos correctamente", response.data);
      return response.data;
    } else {
      console.log("No se recibió el token");
      throw new Error("Token no encontrado en la respuesta");
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    throw error;
  }
};