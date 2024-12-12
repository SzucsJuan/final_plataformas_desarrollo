const db = require('../config/database');

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, role} = req.body;

    try{
        const result = await db.query(
            'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ? AND role = "user"',
            [name, email, role, id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Usuario no encontrado.'})
        }
        res.json({message: 'Usuario actualizado exitosamente.'})
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar usuario', error});
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await db.query(
            'DELETE FROM users WHERE id = ? AND role = "user"',
            [id]
        );
        if(result.affectedRows === 0) {
            return res.status(404).json({message: 'Usuario no encontrado.'})
        }
        res.json({message: 'Usuario eliminado exitosamente.'})
    } catch (error){
        res.status(505).json({message: 'Error al eliminar el usuario', error});
    }
};

module.exports = {updateUser, deleteUser};