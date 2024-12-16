const bcrypt = require("bcrypt");
const db = require("../config/database");

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({error: "Todos los campos son obligatorios."});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10)

        const insertQuery =  `INSERT INTO users (name, email, password, role) VALUES (?,?,?,?) `;
        const role = "user";

        db.query(insertQuery,[name, email, hashedPassword, role], (err, results) => {
            if(err){
                console.error("Error al insertar usuario:", err);
                return res.status(500).json({error: "Error en el servidor"});
            }
            res.status(201).json({message: "Usuario registrado exitosamente", userId: results.insertId});
        });
    } catch(error){
        console.error("Error al registrar usuario:", error);
        res.status(500).json({error: "Error en el servidor."});
    };

};
module.exports = {registerUser};