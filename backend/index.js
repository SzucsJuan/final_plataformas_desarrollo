const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
// const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoute);

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});