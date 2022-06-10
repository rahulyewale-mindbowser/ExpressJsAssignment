
module.exports = mongoose => {
  const Users = mongoose.model(
    "users",
    mongoose.Schema(
      {
        name:{
          type:String,
          minlength:[2,"Minimum length should be 2 characters"],
          maxlength:[30,"Maximum length should be 30 characters"]

        },
        email: {
          type:String,
          unique:true,
          match:[/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Enter valid Email"]
        },
        phone:{
          type:String,
          match: [/^(\+\d{1,3}[- ]?)?\d{10}$/,"Enter 10 digit number"]
        },
        password:{
          type:String,
          // match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        }
      }
    )
  );
  return Users;
};