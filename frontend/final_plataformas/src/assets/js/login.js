import { loginUser } from "../../services/authServices";

document.getElementById("login").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageLogin = document.getElementById("message");

    try {
        // Llamada al servicio para autenticar al usuario
        const response = await loginUser(username, password);
        
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("role", response.user.role);
        localStorage.setItem("token", response.token);
        
        window.location.href = "src/views/home.html";
    } catch (error) {
        messageLogin.textContent = "El usuario o la contraseña son incorrectos.";
        messageLogin.className = "error";
        messageLogin.style.display = "block";
    }
});
