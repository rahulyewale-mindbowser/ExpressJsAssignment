
// regex object 
const regex = {
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
  
  //  middleware Function for validating signup data
  function validSignupData(req, res, next) {
    try {
      if(!req.body || !req.body.email || !req.body.name || !req.body.password || !req.body.phone)
    {
      res.status(400).send("Provide all Fields email, name, password, phone number");
    }
     if (!passwordValidator(req.body.password)) {
      res
        .status(400)
        .send(
          "Enter Valid Password combination of alphabets, at least one special character, and at least one digit with minimum of 8 and maximum of 16 characters."
        );
    }
    else {
      next();
      return;
    }
    } catch (error) {
      res.send(error)
      return;
    }
  }
  function validUpdateData(req,res,next){
    try {
      if(!req.body){
        res.status(400).send("Please provide Fields which has to be update");
      }
      if (!passwordValidator(req.body.password)) {
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
    } catch (error) {
      res.send(error);
      return;
    }
  }

  module.exports = {
    validSignupData,validUpdateData
  };
