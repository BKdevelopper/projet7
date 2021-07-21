const bcrypt = require('bcrypt')
const conn = require('../utils/db')
const jwt = require('jsonwebtoken')



exports.signup = async function(req,res){
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10)  
    var users={
        "username": req.body.username,
        "email": req.body.email,
        "password":encryptedPassword
        }
    try{
        conn.query('INSERT INTO users SET ?',users, function (error, results, fields) {
            if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            } else {
            res.send({
                "code":200,
                "success":"user registered sucessfully"
                });
            }
    });
    }catch(err){
        console.log(err)
    }
}

exports.getAllUsers = (req, res, next) => {
    conn.query(
      'SELECT idUser, username, isAdmin, des, email FROM groupomania.users',
      function (error, results, fields) {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ results })
      }
    )
  }

exports.login = (req, res) => {
    const user = req.body.username
    const pass = req.body.password
    if (user && pass) {
        conn.query('SELECT * FROM groupomania.users WHERE username= ?',user,
        function (_error, results, _fields) {
            var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            results[0].password
            );
    
            if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
            }
            let Admin = results[0].isAdmin;
            let role = ''
            if (Admin === 1) {
                role = 'admin'
            } else {
                role = 'member'
            }
        
            var token = jwt.sign({ id: results[0].idUser, roles: role }, process.env.SECRET_KEY, {
            expiresIn: 86400 // 24 hours
            });
    
            res.status(200).send({
                id: results[0].idUser,
                username: results[0].username,
                email: results[0].email,
                roles: role,
                accessToken: token
            });
        } 
        )
    }
        
}