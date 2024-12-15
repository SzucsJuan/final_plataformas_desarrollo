const db = require('../config/database');
const jwt = require('jsonwebtoken');

const addRecipe = (req, res) => { 
    const {nombre, tiempo_coccion, ingredientes, descripcion} = req.body;
    // const token = req.headers.authorization?.split(" ")[1]; parte de la validacion del token (comentado)

    const userId = 1; //hardcodeo para probar el flujo sin auth

    if (!nombre || !tiempo_coccion || !ingredientes || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = `
        INSERT INTO recetas (nombre, tiempo_coccion, ingredientes, descripcion, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, tiempo_coccion, ingredientes, descripcion, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al guardar la receta" });
        }
        res.status(201).json({ message: "Receta creada con éxito", recetaId: result.insertId });
    });

    
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
 };



module.exports = {addRecipe};