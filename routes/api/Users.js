const express = require('express');
const router = express.Router();
const fs = require('fs')
const validator = require('../../middlewares/user')


router.post('/login',validator.validLogin,(req,res)=>{

        let logininfo ={
            email:req.body.email,
            password: req.body.password
        }

        
        fs.readFile("./user.json", "utf8", (err, data)=> {
            if (err) {
                console.log(err);
                res.status(400).send("Error ")
            } else {

                var obj = JSON.parse(data);   

               
                const jsondata = logininfo;
                
                let found = false;  

                
                for(let i = 0; i < obj.users.length; i++){
                   
                    if(jsondata.email === obj.users[i].email &&
                        jsondata.password === obj.users[i].password){

                            res.status(200).send(" login success")    
                            found = true;
                            break;
                    }         
                }

              
                if(!found){
                    res.status(401).send("User not found")
            }   
        }
        })
})


router.post('/signup',validator.validSignupData,(req,res)=>{
   
    fs.readFile('./user.json','utf8',(err,data)=>{
        let newUser ={
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
        }
    
        let found = false;
            if (err) {
                console.log(err);
            } else {
                
                let obj = JSON.parse(data);

             
                for(let i = 0 ;i < obj.users.length;i++){
                    if(obj.users[i].email === newUser.email){
                            console.log("User Already Exits");
                            res.status(400).send("User Already Exists")
                            found=true;
                    }         
                }
                
                if(!found){
                    
                    obj.users.push(newUser);

                   
                    let json = JSON.stringify(obj, null, 2);

                   
                    fs.writeFile("./user.json", json, "utf8", (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error while storing data")
                        } else {
                            console.log("Registration Done");
                            res.status(200).send(obj)
                        }
                    });
                }
                 
            }
    
   
    

})
    })

router.put('/',validator.validSignupData,(req,res)=>{

    let userData ={
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password
    }

    
    fs.readFile("./user.json", "utf8", (err, data) => {

        
        let found=false;

        if (err) {
            console.log(err);
        } else {

           
            let obj = JSON.parse(data);

            
            const update = userData;

            
            for(let i=0;i<obj.users.length;i++){

                if(obj.users[i].email=== req.query.email){
                    obj.users[i] = update;
                    found=true;
                }

            }
           
            if(!found){
               req.status(404).send("User not Found")
            }else{

                let json = JSON.stringify(obj, null, 2);

                
                fs.writeFile("./user.json", json, "utf8", (err) => {
                    if (err) {
                        console.log(err);
                        res.end("Error while Updating data!");
                    } else {
                        console.log("Done Updating");
                        res.status(200).send("user Updated")
                    }
                });
            }

            
         }
    });
})



router.delete('/',(req,res)=>{
    fs.readFile("./user.json", "utf8", (err, data) => {

       
        let found =false;

        if (err) {
            console.log(err);
        } else {

            
            let obj = JSON.parse(data);

            
            for(let i=0;i<obj.users.length;i++){

                if(obj.users[i].email === req.query.email){
                    obj.users.splice(i,1); 
                    found = true;
                }

            }

            if(!found){
                res.status(404).send("User Not Found")
            }else{
                
                let json = JSON.stringify(obj, null, 2);

                
                fs.writeFile("./user.json", json, "utf8", (err) => {
                    if (err) {
                        console.log(err);
                        res.end("Error while Deleting data!");
                    } else {
                        console.log("Done Deleting");
                        res.status(200).send("User Deleted")
                    }
                });
            }

            
         }
    });

})
module.exports =router;
