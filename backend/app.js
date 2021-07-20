const express = require('express')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'groupomania'
// })

// conn.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Mysql connected...')
// })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);

module.exports = app;