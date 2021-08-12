const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // On vérifie le token avec la clé pour lire ce TOKEN
    const userId = decodedToken.id;
    if (req.body.idUser && req.body.idUser !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error | "Invalid request!",
    });
  }
};
