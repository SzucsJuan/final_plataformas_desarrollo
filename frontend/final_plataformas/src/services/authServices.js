import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // console.log("Respuesta desde el backend:", response.data);

    if (response.data) {
      const { token, user } = response.data;

      if (!user || !user.role) {
        throw new Error("Rol no identificado");
      }

      if (user.role === "admin") {
        if (token) {
          // console.log("Admin autenticado");
          return response.data;
        } else {
          throw new Error("Falta el token para el administrador");
        }
      } else {
        // console.log("Usuario autenticado");
        return response.data;
      }
    } else {
      throw new Error("Datos faltantes en la respuesta del servidor");
    }
  } catch (error) {
    console.error("Error de autenticación:", error.message);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Error de registro:", error.message);
    throw error;
  }
};
