const jwt = require("jsonwebtoken");
require('dotenv').config();

verifyToken = (req, res, next) => {
    const authHeader= req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

  module.exports = verifyToken;