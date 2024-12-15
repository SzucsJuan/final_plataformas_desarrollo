import { loginUser } from "../../services/authServices";

document
  .getElementById("login")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageLogin = document.getElementById("message");

    // console.log("Email:", email);
    // console.log("Password:", password);

    try {
      const response = await loginUser(email, password);
    //   console.log("Respuesta del servidor:", response);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("role", response.user.role);
      if (response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "/src/views/home.html";
      } else {
        window.location.href = "/src/views/home.html";
      }
    } catch (error) {
      console.error("Error de autenticación:", error.response || error);
      messageLogin.textContent = "El mail o la contraseña son incorrectos.";
      messageLogin.className = "error";
      messageLogin.style.display = "block";
    }
  });
