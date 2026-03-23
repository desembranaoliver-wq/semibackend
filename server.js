const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const routes = require('./routes/index');
 
const app = express();
 
const moment = require('moment');
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} - ${moment().format()}`);
    next();
};
 
app.use(logger);
app.use(cors({
    origin: 'https://semifrontend-kappa.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/api', routes);
 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
