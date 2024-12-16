import commentsService from "../../services/commentsServices";

document.addEventListener('DOMContentLoaded', async () => {
    const opinionList = document.getElementById('opinionList');
    
    try {
        const comments = await commentsService.getComments();
        
        if (comments && comments.length > 0) {
            comments.forEach(comment => {
                const commentItem = document.createElement('li');
                commentItem.classList.add('list-group-item');
                commentItem.innerHTML = `
                <strong>${comment.name}</strong>
                <span class="text-muted">(${comment.valoracion}/10)</span>
                <p>${comment.comentario}</p>
                `;
                opinionList.appendChild(commentItem);
            });
        } else {
            opinionList.innerHTML = '<li class="list-group-item">No hay comentarios disponibles.</li>';
        }
    } catch (error) {
        opinionList.innerHTML = '<li class="list-group-item">Error al cargar los comentarios.</li>';
        console.error("Error al cargar los comentarios:", error);
    }
});
