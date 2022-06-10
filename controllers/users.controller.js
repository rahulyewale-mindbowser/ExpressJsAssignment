
const bcrypt = require("bcrypt")
const db = require("../models/index");
const Users = db.users;
const jwt= require('jsonwebtoken');

require('dotenv').config();

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  var hashedPassword = await bcrypt.hash(req.body.password, 10);
  // Create a User
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword
    // password:req.body.password
  });
  // Save User in the database
  user
    .save(user)
    .then(data => {
      // res.send(data);
      res.status(201).send({ message: "user registered successfully" })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// signin user

exports.signin = (req, res) => {
 try {
  Users.findOne({
    email: req.body.email,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      var token = jwt.sign({ id: user.id },process.env.SECRET_KEY);
      // req.session.token = token;
      console.log(user.id);
      res.status(200).send({
        message: "login successfull",id:user._id, token
      });
    });
 } catch (error) {
   console.log(error);
 }
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Users.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.query.id;
  Users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  if (req.body.email) {
    return res.status(400).send({
      message: "Email cannnot be update!"
    });
  }
  const id = req.query.id;
  var hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.query.id;
  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};