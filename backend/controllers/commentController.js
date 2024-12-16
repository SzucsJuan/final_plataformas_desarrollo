const jwt = require ('jsonwebtoken');
const db = require('../config/database');

const addComment = (req, res) => {
    const{comentario, valoracion, recetaId} = req.body;
    const token = req.headers.authorization?.split(" ")[1]; 

    if(!token) {
        return res.status(401).json({error: "No se proporciono un token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if(!comentario || !valoracion || !recetaId){
            return res.status(400).json({error: "Los campos no pueden quedar vacios."})
        }
        const roleQuery = `SELECT role FROM users WHERE id = ?`;
        db.query(roleQuery,[userId],(err, results) =>{
            if(err){
                console.error(err);
                return res.status(500).json({error: "Error al verificar el rol de usuario?"});
            }
            if(results.length === 0){
                return res.status(500).json({error: "Usuario no encontrado"});
            }
            const userRole = results[0].role;
            if (userRole !== "user") {
                return res.status(403).json({ error: "Solo los usuarios con el rol 'user' pueden dejar comentarios" });
            }
        })

        const commentQuery = `
        INSERT INTO comentarios (comentario, valoracion, user_id, receta_id)
        VALUES (?,?,?,?)
        `;
        db.query(commentQuery, [comentario, valoracion, userId, recetaId], (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({error: "Error al guardar el comentario."});
            }
            res.status(201).json({message: "Comentario publicado con exito.", comentarioId: result.insertId});
        });
    } catch (error){
        console.error("Error de autenticacion", error)
    };
};

const getComments = async (req, res) => {
    const query = "SELECT * FROM comentarios";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.status(200).json(results);
    });
  };

module.exports = {addComment, getComments};