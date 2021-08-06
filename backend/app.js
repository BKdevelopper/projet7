const express = require('express')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const { requireAuth} = require('./middleware/auth')
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path')

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
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   //res.setHeader('Access-Control-Allow-Credentials', 'true')
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
//   //res.status(200).send(res.locals.user)
//   res.status(200).send(String(res.locals.user));
// });
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;