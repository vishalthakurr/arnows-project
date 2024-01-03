require("dotenv").config();
require("../backend/connDB/db");
const express = require("express");

const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json()); // for middle ware to req for json

// avaliable routes
app.use("/api", require("../backend/routes/userAuth")); // router file use
app.use("/api/message", require("../backend/routes/Usermessage"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(` running `);
});
