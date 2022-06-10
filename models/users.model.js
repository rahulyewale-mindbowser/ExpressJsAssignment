
module.exports = mongoose => {
  const Users = mongoose.model(
    "users",
    mongoose.Schema(
      {
        name:{
          type:String,
          minlength:2,
          maxlength:30

        },
        email: {
          type:String,
          unique:true,
          match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
        phone:{
          type:String,
          match: /^(\+\d{1,3}[- ]?)?\d{10}$/
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