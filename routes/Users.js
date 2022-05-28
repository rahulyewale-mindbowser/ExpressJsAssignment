
module.exports = app => {
    const validator = require('../middlewares/uservalidate')
    const users = require("../controllers/users.controller");
    var router = require("express").Router();
    // Create a new user
    router.post("/signup",validator.validSignupData, users.create);

    // login a user
    router.post("/login",users.login);

    // Retrieve all Users
    // router.get("/", users.findAll);
    
    // Retrieve a single user with email
    router.get("/", users.findOne);

    // Update a users with email
    router.patch("/",validator.validUpdateData, users.update);

    // Delete a users with email
    router.delete("/", users.delete);

    // Delete all users
    // router.delete("/", users.deleteAll);
    app.use('/api/users', router);
  };