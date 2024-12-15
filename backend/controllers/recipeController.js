const db = require('../config/database');
const jwt = require('jsonwebtoken');

const addRecipe = (req, res) => { 
    const {nombre, tiempo_coccion, ingredientes, descripcion} = req.body;
    // const token = req.headers.authorization?.split(" ")[1]; parte de la validacion del token (comentado)
        // if(!token){
    //     return res.status(401).json({error: "No se proporciono un token valido"});
    // }
    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     const userId = decoded.id;

    //     if(!nombre || !tiempo_coccion || !ingredientes || !descripcion){
    //         return res.status(400).json({error: "Los campos no pueden quedar vacios."})
    //     }

    //     const query = `
    //     INSERT INTO recetas (nombre, ingredientes, tiempo_coccion, descripcion, user_id)
    //     VALUES (?,?,?,?,?)
    //     `;
    //     db.query(query,[nombre, ingredientes, tiempo_coccion, descripcion, userId], (err, result) => {
    //         if(err){
    //             console.error(err);
    //             return res.status(500).json({error: "Error al guardar la receta."});
    //         }
    //         res.status(201).json({message: "Receta creada exitosamente.", recetaId: result.insertId});
    //     });
    // } catch (error){
    //     console.error("Error de autenticacion", error);
    //     return res.status(403).json({error: "Token invalido o expirado."})
    // }

    const userId = 1; //hardcodeo para probar el flujo sin auth

    if (!nombre || !tiempo_coccion || !ingredientes || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const addQuery = `
        INSERT INTO recetas (nombre, tiempo_coccion, ingredientes, descripcion, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(addQuery, [nombre, tiempo_coccion, ingredientes, descripcion, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al guardar la receta" });
        }
        res.status(201).json({ message: "Receta creada con éxito", recetaId: result.insertId });
    });
 };
 const deleteRecipe = (req, res) => {
    const {id} = req.params;
    const checkQuery = `SELECT * FROM recetas WHERE id = ?`;
    db.query(checkQuery, [id], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: "Error en el servidor al buscar la receta"})
        }
        if(results.lenght === 0) {
            return res.status(400).json({error: "Receta no encontrada."});
        }
        const deleteQuery = `DELETE FROM recetas WHERE id = ?`;
        db.query(deleteQuery, [id], (err) => {
            if(err){
                console.error(err);
                return res.status(500).json({error: "Error al eliminar receta."});
            }
            res.status(200).json({message: "Receta eliminada."})
        });
    });
};

const updateRecipe = (req, res) => {
    const {id} = req.params;
    const {nombre, tiempo_coccion, ingredientes, descripcion} = req.body;

    if (!nombre || !tiempo_coccion || !ingredientes || !descripcion) {
        return res.status(400).json({error: "Los campos son obligatorios"});
    }
    const checkQuery = `SELECT * FROM recetas WHERE id = ?`;
    db.query(checkQuery, [id], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: "Error en el servidor al buscar la receta"})
        }
        if(results.length === 0){
            return res.status(400).json({error: "Receta no encontrada."});
        }
        const updateQuery = `UPDATE recetas SET nombre = ?, tiempo_coccion = ?, ingredientes = ?, descripcion = ? WHERE id = ?`;
        db.query(updateQuery, [nombre, tiempo_coccion, ingredientes, descripcion, id], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).json({error: "Error al actualizar receta."});
            }
            return res.status(200).json({message: "Receta actualizada."});
        });
    });
};


module.exports = {addRecipe, deleteRecipe, updateRecipe};