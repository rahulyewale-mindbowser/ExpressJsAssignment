// const express = require('express');
// const router = express.Router();
// const fs = require('fs')
// const validator = require('../../middlewares/uservalidate')

// // To get usersdata from file
// const getUsers =  () => {
//     try{
//         const bufferData = fs.readFileSync("./user.json");
//         return JSON.parse(bufferData.toString());
//     }catch(e){
//         console.log(e);
//         return [];
//     }
// }
// // Login router
// router.post('/login', (req, res) => {

//     try {

//         let logininfo = {
//             email: req.body.email,
//             password: req.body.password
//         }


//         //To get all users       
//            var obj =getUsers();

//            // Flag
//                 let found = false;
//                 for (let i = 0; i < obj.users.length; i++) {

//                     if (logininfo.email === obj.users[i].email &&
//                        logininfo.password === obj.users[i].password) {

//                         found = true;
//                         return res.status(200).send(" login success")
//                     }        
                    
//                 }

//                 if (!found) {
//                         return res.status(401).send("User not found")
//                     }
          
//     } catch (error) {
//         console.log(error);
//     }
// })

// // Router for Signup user
// router.post('/signup', validator.validSignupData, (req, res) => {

//     try {
        
   
//     // access request body in newUser
//         let newUser = {
//             name: req.body.name,
//             phone: req.body.phone,
//             email: req.body.email,
//             password: req.body.password
//         }

//         let found = false;
//             let obj =getUsers();
//             for (let i = 0; i < obj.users.length; i++) {
//                 if (obj.users[i].email === newUser.email) {
//                     console.log("User Already Exits");
//                     res.status(400).send("User Already Exists")
//                     found = true;
//                 }
//             }

//             if (!found) {
//                 obj.users.push(newUser);
//                 let json = JSON.stringify(obj, null, 2);

//                 // write new user in file
//                 fs.writeFile("./user.json", json, "utf8", (err) => {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).send("Error while storing data")
//                     } else {
//                         // console.log("Registration Done");
//                         res.status(200).send(obj)
//                     }
//                 });
//             }
//         } catch (error) {
        
//         }

// })

// // Router for Update the user
// router.put('/', validator.validSignupData, (req, res) => {

//     try {
        
    
//     let userData = {
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email,
//         password: req.body.password
//     }

//         let found = false;

//             let obj = getUsers();

//             const update = userData;

//             for (let i = 0; i < obj.users.length; i++) {

//                 if (obj.users[i].email === req.query.email) {
//                     obj.users[i] = update;
//                     found = true;
//                 }

//             }

//             if (!found) {
//                 res.status(404).send("User not Found")
//             } else {

//                 let json = JSON.stringify(obj, null, 2);


//                 fs.writeFile("./user.json", json, "utf8", (err) => {
//                     if (err) {
//                         // console.log(err);
//                         throw err;
//                         res.end("Error while Updating data!");
//                     } else {
//                         // console.log("Done Updating");
//                         res.status(200).send("user Updated")
//                     }
//                 });
//             }
//         } catch (error) {
        
//         }
        
// })

// // router for delete user
// router.delete('/', (req, res) => {

//     try {
        
//         let found = false;

//             let obj = getUsers();
//             for (let i = 0; i < obj.users.length; i++) {
//                 if (obj.users[i].email === req.query.email) {
//                     obj.users.splice(i, 1);
//                     found = true;
//                 }

//             }

//             if (!found) {
//                 res.status(404).send("User Not Found")
//             } else {

//                 let json = JSON.stringify(obj, null, 2);


//                 fs.writeFile("./user.json", json, "utf8", (err) => {
//                     if (err) {
//                         // console.log(err);
//                         throw err;
//                         res.end("Error while Deleting data!");
//                     } else {
//                         // console.log("User Deleting");
//                         res.status(200).send("User Deleted")
//                     }
//                 });
//             }  
//         } catch (error) {
        
//         }

// })
// module.exports = router;

module.exports = app => {
    const validator = require('../../middlewares/uservalidate')
    const users = require("../../controllers/users.controller");
    var router = require("express").Router();
    // Create a new user
    router.post("/",validator.validSignupData, users.create);

    // login a user
    router.post("/login",users.login);
    
    // Retrieve all Users
    // router.get("/", users.findAll);
    
    // Retrieve a single user with email
    router.get("/", users.findOne);

    // Update a users with email
    router.put("/",validator.validSignupData, users.update);

    // Delete a users with email
    router.delete("/", users.delete);

    // Delete all users
    // router.delete("/", users.deleteAll);
    app.use('/api/users', router);
  };