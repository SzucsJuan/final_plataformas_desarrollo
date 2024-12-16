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
            <button class="btn btn-primary btn-sm me-2" onclick="editarUsuario(${usuario.id}, '${usuario.name}', '${usuario.email}', '${usuario.rol}')">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">🗑️</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">Error al cargar los usuarios. Inténtalo más tarde.</td>
      </tr>
    `;
  }
});

async function eliminarUsuario(userId) {
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
  deleteModal.show();

  document.getElementById('confirmDeleteBtn').onclick = async function () {
    const token = localStorage.getItem("token");

    try {
      await usersService.deleteUser(userId, token);
      alert("Éxito", "Usuario eliminado con éxito.", "success");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error", "Error al eliminar el usuario. Inténtalo nuevamente.", "danger");
    }

    const deleteModalClose = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    deleteModalClose.hide();
  };
};

function editarUsuario(userId, currentName, currentEmail) {
  document.getElementById('editUserName').value = currentName;
  document.getElementById('editUserEmail').value = currentEmail;

  const editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  editModal.show();

  document.getElementById('editUserForm').onsubmit = async function (e) {
    e.preventDefault();

    const nuevoNombre = document.getElementById('editUserName').value;
    const nuevoEmail = document.getElementById('editUserEmail').value;

    if (!nuevoNombre || nuevoNombre.trim() === "") {
      alert("El nombre no puede estar vacío.");
      return;
    }

    const updatedData = {
      name: nuevoNombre,
      email: nuevoEmail,
    };

    try {
      await usersService.updateUser(userId, updatedData, localStorage.getItem("token"));
      alert("Usuario actualizado con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario. Inténtalo nuevamente.");
    }

    const editModalClose = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    editModalClose.hide();
  };
}

window.eliminarUsuario = eliminarUsuario;
window.editarUsuario = editarUsuario;
