const sql = require("../models/db");
const User = require("../models/users.model");
// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  // Save User in the database
 User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    else res.send(data);
  });
  
};

exports.login =(req,res)=>{

	try {
    // Get Email and password from body
	let email = req.body.email;
	let password = req.body.password;
	// Ensure the email &password exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the user from the database based on the specified email and password
		sql.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the user exists
			if (results.length > 0) {
				
                console.log("successfull");
                res.send("login successfull")
			} else {
				res.send('Incorrect email and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
  } catch (error) {
    res.send(error)
  }
}



// Find a single user with a id
exports.findOne = (req, res) => {
    User.findById(req.query.id, (err, data) => {
        try {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found user with id ${req.query.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving user with id " + req.query.id
              });
            }
          } else res.send(data);
       
        } catch (error) {
          console.log(error);
          
        }
      });
};

// Update a Users identified by the email in the request
exports.update = (req, res) => {
     // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if(req.body.email){
    res.status(404).send({
      message:"Email cannot updated"
    });
    return;
  }
  // console.log(req.body);
  try {
    User.updateById(
      req.query.id,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.query.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating user with id " + req.query.id
            });
          }
        } else res.send(data);
      }
    );
  } catch (error) {
    res.send(error)
  }
  
};

// Delete a user with the specified Id in the request
exports.delete = (req, res) => {
    try {
      User.remove(req.query.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with Id ${req.query.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete user with Id " + req.query.id
            });
          }
        } else res.send({ message: `user was deleted successfully!` });
      });
    } catch (error) {
      res.send(error);
    }
  
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    try {
      User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all user"
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
    } catch (error) {
      res.send(error);
    }
  
};