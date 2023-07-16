// Dependencies
 const jwt = require('jsonwebtoken') ;

 const generateToken = (id, name) => {
  const token = jwt.sign(
    {
     id : id,
     name : name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return token
 }

 module.exports = generateToken ;

