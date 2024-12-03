const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dr_final_plataformas'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = connection;