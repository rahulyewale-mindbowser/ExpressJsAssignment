
const jwt= require('jsonwebtoken');
const verifyToken = require('../middlewares/authJwt')
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  const {validSignupData,validUpdateData} = require('../middlewares/uservalidate')
    const users = require("../controllers/users.controller");
    var router = require("express").Router();
    
    // Create a new user
    router.post("/signup",validSignupData, users.create);

    // login a user
    router.post("/login", users.signin);

    // Retrieve all Users
    router.get("/all", verifyToken, users.findAll);
    
    // Retrieve a single user with email
    router.get("/",verifyToken, users.findOne);

    // Update a users with email
    router.patch("/",verifyToken,validUpdateData, users.update);

    // Delete a users with email
    router.delete("/",verifyToken, users.delete);

    // Delete all users

    router.delete("/all",verifyToken, users.deleteAll);
    app.use('/api/users', router);
  };