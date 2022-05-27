const res = require("express/lib/response");
const sql = require("./db.js");
// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.phone = user.phone;
  this.password =user.password;
};
// To create new user
User.create = (newUser, result) => {
 try {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { ...newUser});
    result(null, { ...newUser });
  });
 } catch (error) {
   res.send(error);
 }
};

// To find User BY ID
User.findById = (id, result) => {
 try {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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
    // not found user with the ID
    result({ kind: "not_found" }, null);
  });
 } catch (error) {
   res.send(error);
 }
};
// To get all users Data

User.getAll = (email, result) => {
  try {
    let query = "SELECT * FROM users";
  if (email) {
    query += ` WHERE email LIKE '%${email}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
  } catch (error) {
    res.send(error);
  }
};


// Update a user by id
User.updateById = (id, user, result) => {
  try {
    sql.query(
      "UPDATE users SET name = ?, phone = ?, password = ? WHERE id = ?",
      [user.name, user.phone, user.password, id],
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
        try {
          sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            if (res.length) {
              console.log("Updated user: ", res[0]);
              result(null, res[0]);
              return;
              
            }
            // not found user with the ID
            result({ kind: "not_found" }, null);
          });
         } catch (error) {
           res.send(error);
         }
        
      }
    );
  } catch (error) {
    res.send(error);
  }
};

// Delete the user specified with id
User.remove = (id, result) => {
  try {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  } catch (error) {
    res.send(error);
  }
};

// Delete all user from  users table
User.removeAll = result => {
  try {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  } catch (error) {
    res.send(error);
  }
};
module.exports = User;