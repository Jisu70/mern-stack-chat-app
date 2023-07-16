// Dependencies
const mongooose = require('mongoose') ;

const connectToDb = async () => {
  try {
    const conn = await mongooose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(` Error : ${error}`) ;
    process.exit()
  }
}

module.exports = connectToDb

