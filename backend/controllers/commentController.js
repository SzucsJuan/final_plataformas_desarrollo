const jwt = require ('jsonwebtoken');
const db = require('../config/database');

const addComment = (req, res) => {
    const{comentario, valoracion, recetaId} = req.body;
    const userId = 1; //hardcodeo para probar el flujo sin auth

    if (!comentario || !valoracion || !recetaId) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (valoracion < 1 || valoracion > 5) {
        return res.status(400).json({ error: "La valoración debe estar entre 1 y 5" });
    }

    const query = `
        INSERT INTO comentarios (comentario, valoracion, user_id, receta_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [comentario, valoracion, userId, recetaId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al guardar el comentario" });
        }
        res.status(201).json({ message: "Comentario publicado con éxito", comentarioId: result.insertId });
    });

    // const token = req.headers.authorization?.split(" ")[1];

    // if(!token) {
    //     return res.status(401).json({error: "No se proporciono un token"});
    // }

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     const userId = decoded.id;

    //     if(!comentario || !valoracion || !recetaId){
    //         return res.status(400).json({error: "Los campos no pueden quedar vacios."})
    //     }

    //     const query = `
    //     INSERT INTO comentarios (comentario, valoracion, user_id, receta_id)
    //     VALUES (?,?,?,?)
    //     `;
    //     db.query(query, [comentario, valoracion, userId, recetaId], (err, result) => {
    //         if(err){
    //             console.error(err);
    //             return res.status(500).json({error: "Error al guardar el comentario."});
    //         }
    //         res.status(201).json({message: "Comentario publicado con exito.", comentarioId: result.insertId});
    //     });
    // } catch (error){
    //     console.error("Error de autenticacion", error)
    // };
};

module.exports = {addComment};