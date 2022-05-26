const sql = require("./db.js");
// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.phone = user.phone;
  this.password =user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { ...newUser});
    result(null, { ...newUser });
  });
};



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
    
// }

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ${email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};
// To get all users Data
// User.getAll = (email, result) => {
//   let query = "SELECT * FROM users";
//   if (email) {
//     query += ` WHERE email LIKE '%${email}%'`;
//   }
//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("users: ", res);
//     result(null, res);
//   });
// };


// Update a user by email
User.updateByEmail = (email, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, phone = ?, email = ? WHERE email = ?",
    [user.name, user.phone, user.email, email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { email: email, ...user });
      result(null, { email: email, ...user });
    }
  );
};

// Delete the user specified with Email
User.remove = (email, result) => {
  sql.query("DELETE FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found email with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with email: ", email);
    result(null, res);
  });
};

// Delete all user from  users table
User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
module.exports = User;