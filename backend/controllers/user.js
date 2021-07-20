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