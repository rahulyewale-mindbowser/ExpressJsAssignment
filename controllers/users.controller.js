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
}

// Retrieve all email from the database (with condition).
// exports.findAll = (req, res) => {
//     const email = req.query.email;
//   User.getAll(email, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     else res.send(data);
//   });
  
// };


// Find a single user with a email
exports.findOne = (req, res) => {
    User.findByEmail(req.query.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with email ${req.query.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with email " + req.query.email
            });
          }
        } else res.send(data);
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
  console.log(req.body);
  User.updateByEmail(
    req.query.email,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.query.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with email " + req.query.email
          });
        }
      } else res.send(data);
    }
  );
  
};
// Delete a user with the specified email in the request
exports.delete = (req, res) => {
    User.remove(req.query.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.query.email}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete user with email " + req.query.email
            });
          }
        } else res.send({ message: `user was deleted successfully!` });
      });
  
};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all user"
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
  
};