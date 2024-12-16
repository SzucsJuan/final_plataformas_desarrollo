import usersService from "../../services/usersServices";

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const tableBody = document.querySelector("table tbody");
  
    if (!token) {
      console.log("No estás autenticado. Por favor, inicia sesión.");
      window.location.href = "/login.html";
      return;
    }
  
    try {
      const usuarios = await usersService.getUsers(token);
    //   console.log("Usuarios:", usuarios);
  
      tableBody.innerHTML = "";
  
      usuarios.forEach((usuario) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
                  <td class="hidden">${usuario.id}</td>
                  <td>${usuario.name}</td>
                  <td>${usuario.email}</td>
                  <td class="hidden">${usuario.password}</td>
                  <td class="hidden">${usuario.rol}</td>
                  <td>
                      <button class="btn btn-primary btn-sm me-2" onclick="editarUsuario(${usuario.id}, '${usuario.name}')">✏️</button>
                      <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">🗑️</button>
                  </td>
              `;
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      tableBody.innerHTML = `
              <tr>
                  <td colspan="3">Error al cargar las usuarios. Inténtalo más tarde.</td>
              </tr>
          `;
    }
  });

  async function eliminarUsuario(userId) {
    const token = localStorage.getItem("token");
  
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }
  
    try {
      await usersService.deleteUser(userId, token);
      alert("Usuario eliminado con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar la usuario. Inténtalo nuevamente.");
    }
  }
  
  async function editarUsuario(
    userId,
    currentName,
    currentEmail,
    currentRole
  ) {
    const token = localStorage.getItem("token");
  
    const nuevoNombre = prompt("Editar nombre de usuario:", currentName);
    const nuevoEmail = prompt(
      "Edita mail del usuario:",
      currentEmail
    );
    const nuevoRole = prompt(
      "Edita el rol del usuario:",
      currentRole
    );
  
    if (!nuevoNombre || nuevoNombre.trim() === "") {
      alert("El nombre no puede estar vacío.");
      return;
    }
  
    const updatedData = {
      name: nuevoNombre,
      email: nuevoEmail,
      role: nuevoRole,
    };
  
    console.log("Datos actualizados:", updatedData);
  
    try {
      await usersService.updateUser(userId, updatedData, token);
      alert("Usuario actualizado con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario. Inténtalo nuevamente.");
    }
  }
  
  window.eliminarUsuario = eliminarUsuario;
  window.editarUsuario = editarUsuario;