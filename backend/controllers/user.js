const bcrypt = require('bcrypt')
const conn = require('../utils/db')
const jwt = require('jsonwebtoken')
//var ls = require('local-storage');

exports.signup = async function (req, res) {
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
    conn.query('INSERT INTO users SET ?', users, function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        conn.query('SELECT idUser FROM groupomania.users WHERE email= ?', email, function (error, results, fields) {
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

  } catch (err) {
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
      return res.status(200).json({
        results
      })
    }
  )
}
exports.getUsers = (req, res, next) => {
  const user = req.params.id
  conn.query(
    'SELECT idUser, username, isAdmin, des, email FROM groupomania.users WHERE idUser=?', user,
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
    conn.query('SELECT * FROM groupomania.users WHERE username= ?', user,
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

        let token = jwt.sign({
          id: results[0].idUser
        }, process.env.SECRET_KEY, { //id: results[0].idUser, roles: role 
          expiresIn: 86400 // 24 hours
        });
        //res.cookie('jwt', token, { httpOnly: true, maxAge});

        //ls.set('jwt', token)
        //res.ls('jwt', token)

        res.status(200).send({
          id: results[0].idUser,
          username: results[0].username,
          email: results[0].email,
          roles: role,
          accessToken: token
        });
      }

    )
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
    return res.status(201).json('Le compte à bien été supprimer')
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