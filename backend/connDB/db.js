require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoUri = process.env.CONNECT; //mongodb altes used datatbase

mongoose
  .connect(mongoUri, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify :false
  })
  .then(() => {
    console.log(" Database connection suceesful");
  })
  .catch((e) => {
    console.log(e);
  });
