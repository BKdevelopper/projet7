//const conn = require('../utils/db')
const jwt = require('jsonwebtoken')
//var ls = require('local-storage');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // On vérifie le token avec la clé pour lire ce TOKEN
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Invalid request!'});
  }
};
// module.exports.requireAuth = (req, res, next) => {
  
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     console.log(token)
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // On vérifie le token avec la clé pour lire ce TOKEN
//     const userId = decodedToken.id;
    
//     if (req.body.id && req.body.id !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       conn.query('SELECT idUser FROM groupomania.users WHERE idUser= ?',userId, function (error, results, fields) {
//         if(error){
//             res.status({
//                 "code":400,
//                 "failed":"error ocurred..."
//             }) 
//         }else{
//           let user = results[0].idUser;
//           res.locals.user = user;
//           next();           
//         }          
//     })       
//       next();
//     }
//   } catch (error) {
//     res.status(401).json({error: error | 'Invalid request!'});
//   }
// };



// module.exports.checkUser = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         // res.cookie("jwt", "", { maxAge: 1 });
//         next();
//       } else {
//         conn.query('SELECT idUser FROM groupomania.users WHERE idUser= ?',decodedToken.id, function (error, results, fields) {
//           if(error){
//               res.status({
//                   "code":400,
//                   "failed":"error ocurred..."
//               }) 
//           }else{
//             let user = results[0].idUser;
//             res.locals.user = user;
//             next();           
//           }          
//       })       
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
//   } catch (error) {
//         res.status(401).json({error: error | 'Invalid request!'});
//    }
  
// };

// module.exports.requireAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json('no token')
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log('No token...');
//   }
//   } catch (error) {
//     res.status(401).json({error: error | 'Invalid request!'});
// }
  
// };