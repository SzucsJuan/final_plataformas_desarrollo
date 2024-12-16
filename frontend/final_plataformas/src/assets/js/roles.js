document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    const adminProfile = document.getElementById("adminProfile");

    if (role === "admin") {
        adminProfile.style.display = "block";
    } else {
        adminProfile.style.display = "none";
    }
});

const profileIcon = document.getElementById("profileIcon");
const roleModal = document.getElementById("roleModal");

profileIcon.addEventListener("click", function (event) {
    event.preventDefault();
    roleModal.style.display = "block";

    const role = localStorage.getItem("role");
    if (role === "admin") {
        adminProfile.classList.remove("hidden");
    }
});

function closeModal() {
    roleModal.style.display = "none";
}