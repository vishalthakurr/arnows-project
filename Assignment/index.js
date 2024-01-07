require("dotenv").config();
require("../Assignment/connDB/db");
const express = require("express");
// const path = require("path");

const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());

// // Send frontend assets
// clientPath = path.resolve(__dirname, "client", "build");
// app.use(express.static(clientPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(clientPath, "index.html"));
// });

app.use(express.json()); // for middle ware to req for json

// avaliable routes
app.use("/api", require("../Assignment/routes/userAuth")); // router file use
app.use("/api/blog", require("../Assignment/routes/UsersBlog"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(` running `);
});
