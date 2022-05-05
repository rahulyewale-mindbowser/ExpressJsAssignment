
// var validator = require("email-validator"); 


// const validateLogin =(email,password)=>{
//    if(validator.validate(email){

//    }

//     let passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//     if(password.match(passRegex)){

//     }

// }

const regex = {
    // email:/^[a-z]+(?!.(?:\_{2,}|\.{2,}))(?:[\.+\_]{0,1}[a-z])@[a-z]+\.[a-z]{3}$/g,
    email:/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/g,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
    name:/^[a-z A-Z]{2,30}/,
    phone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  };
  const emailValidator = (email) => {
    return regex.email.test(email);
  };
  const passwordValidator = (password) => {
    return regex.password.test(password);
  };
  const nameValidator = (name) => {
    return regex.name.test(name);
  };
  const phoneValidator=(number)=>{
      return regex.phone.test(number)
  }   
  function validSignupData(req, res, next) {
    if(!req.body || !req.body.email || !req.body.name || !req.body.password || !req.body.phone)
    {
      res.status(400).send("Provide all Fields email, name, password, phone number");
    }
    if (!emailValidator(req.body.email)) {
      res.status(400).send("Enter Valid Email");
      console.log(req.body.email);
    } else if (!passwordValidator(req.body.password)) {
      res
        .status(400)
        .send(
          "Enter Valid Password combination of alphabets, at least one special character, and at least one digit with minimum of 8 and maximum of 16 characters."
        );
    } else if (!nameValidator(req.body.name)) {
      res.status(400).send("Enter Valid Name having min 2 and max 30 alphabets");
    } 
    else if(!phoneValidator(req.body.phone))
    {
      res.status(400).send("Enter 10 digit phone number");
    }
    else {
      next();
      return;
    }
  }
  
  const validLogin=(req,res,next)=>{
    if(!req.body || !req.body.email  || !req.body.password || req.body.email.trim().length <= 0 || req.body.password.trim().length <= 0)
    {
      res.status(400).send("Please Provide both fields email, password");
    }
    if (!emailValidator(req.body.email)) {
      res.status(400).send("Enter Valid Email");
    }
    else
    {
      next();
      return;
    }
  }

  module.exports = {
    validSignupData,validLogin
  };
