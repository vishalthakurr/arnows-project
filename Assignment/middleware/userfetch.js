require("dotenv").config();

const jwt = require("jsonwebtoken");

jwtsect = process.env.SKEY;

const fetchuser = (req, res, next) => {
  //get the user from  the jwt token and id to req object

  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ error: "please authenicate valid user" });
  }

  try {
    const data = jwt.verify(token, jwtsect);
    req.data = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "please authenicate valid user" });
  }
};

module.exports = fetchuser;
