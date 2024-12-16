import { registerUser } from "../../services/authServices";

document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const messageDiv = document.getElementById('message');
    messageDiv.classList.remove('hidden');
    messageDiv.innerHTML = 'Registrando...';
  
    try {
      const response = await registerUser(name, email, password);
      
      messageDiv.innerHTML = 'Registro exitoso. Redirigiendo al inicio de sesión...';
  
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Usuario ya existe') {
        messageDiv.innerHTML = 'Este usuario ya está registrado. Por favor, elige otro correo.';
      } else {
        messageDiv.innerHTML = 'Hubo un error en el registro. Intenta de nuevo más tarde.';
      }
    }
  });