const bcrypt = require('bcrypt');
const db = require('../config/database');

async function createUser() {
    const password = 'user123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

    db.query(query, ['user', 'usuariotest@recipes.com', hashedPassword, 'user'], (err, result) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
        } else {
            console.log('Usuario insertado con éxito:');
        }
    });
}

createUser();
