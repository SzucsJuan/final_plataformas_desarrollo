const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const commentRoute = require('./routes/commentRoute');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoute);
app.use('/api', commentRoute);
app.use('/api/admin', adminRoute);

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});