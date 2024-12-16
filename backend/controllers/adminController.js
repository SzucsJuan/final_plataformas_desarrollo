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

const getUsers = async (req, res) => {
    const query = "SELECT * FROM users WHERE role = 'user'";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.status(200).json(results);
    });
  };

module.exports = {updateUser, deleteUser, getUsers};