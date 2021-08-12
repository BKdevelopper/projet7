const bcrypt = require('bcrypt')
const conn = require('../utils/db')
const jwt = require('jsonwebtoken')
const validator = require("email-validator");
const passwordValidator = require('./passwordvalidator');

exports.signup = async function (req, res) {
  const isValidateEmail = validator.validate(req.body.email);
  const isValidatePassword = passwordValidator.validate(req.body.password);
  const email = req.body.email;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, 10)
  const username = req.body.username;

  var users = {
    "username": username,
    "email": email,
    "password": encryptedPassword
  }
  try {
  if (!isValidatePassword) {
    res.status(400).json({ error : "Format de mot de passe non valide" });
  }
  else if(!isValidateEmail) {
    res.status(400).json({ error : "Format de mail non valide" });
  }else {
    if(email && password && username){
      conn.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
          res.status(400).json(error)
        } else {
          conn.query('SELECT idUser FROM users WHERE email= ?', email, function (error, results, fields) {
            if (error) {
              res.send({
                "code": 400,
                "failed": "error ocurred..."
              })
            } else {
              res.status(200).send({
                id: results[0].idUser
              });
            }
  
          })
        }
  
      });
  
    } else{
      const errors = "Champs manquant";
      res.status(400).json({
        errors
      });
    }
  }
  
  } catch (err) {
    console.log(err)
  }
}

exports.getAllUsers = (req, res, next) => {
  conn.query(
    'SELECT idUser, username, isAdmin, des, email FROM users',
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json({
        results
      })
    }
  )
}
exports.getUsers = (req, res, next) => {
  const user = req.params.id
  conn.query(
    'SELECT idUser, username, isAdmin, des, email FROM users WHERE idUser=?', user,
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json({
        results
      })
    }
  )
}


exports.login = (req, res) => {
  const user = req.body.username
  const pass = req.body.password

  if (user && pass) {
    conn.query('SELECT * FROM users WHERE username= ?', user,
      function (_error, results, _fields) {
        var passwordIsValid = bcrypt.compare(
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
        
        res.status(200).json({
          id: results[0].idUser,
          username: results[0].username,
          email: results[0].email,
          roles: role,
          accessToken: jwt.sign(
            { id: results[0].idUser },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        )
      })

      })
  } else {
    const errors = "erreur...";
    res.status(400).json({
      errors
    });
  }

}
exports.deleteAccount = (req, res, next) => {
  const user = req.params.id

  conn.query('DELETE FROM users WHERE idUser=?', user, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(results.affectedRows)
  })
}

exports.updateEmail = (req, res, next) => {
  const user = req.params.id
  const email = req.body.email
  conn.query('UPDATE users SET email=? WHERE idUser=?',
    [email, user],
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json('Votre email a bien été modifié')
    }
  )
}

