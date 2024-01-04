require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserData = require("../models/userCreateSchema");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/userfetch");

const jwtsect = process.env.SKEY;
router.post(
  "/userSignup",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password- must be altest 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let sucess = true;

    const { name, email, password, cpassword } = req.body;

    //if there are errpr , return bad request and thr error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let client = await UserData.findOne({ email: email });

      if (client) {
        sucess = false;
        return res
          .status(400)
          .json({ sucess, err: "you have already register" });
      } else {
        //password stored to hash
        if (password === cpassword) {
          const salt = await bcrypt.genSalt(10);
          const securepass = await bcrypt.hash(password, salt);
          const user = await UserData.create({
            name,
            email,
            password: securepass,
          });
          const data = {
            user: {
              id: user.id,
            },
          };
          const jwttoken = jwt.sign(data, jwtsect);

          const saveclient = await user.save();

          sucess = true;

          return res.status(200).json({ sucess, saveclient, jwttoken });
        } else {
          sucess = false;
          return res.status(400).send({ sucess, mes: " password is not same" });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "  server error" });
    }
  }
);

router.post(
  "/userSignin",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    //if there are errpr , return bad request and thr error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await UserData.findOne({ email });
      if (!user) {
        success = false;

        return res
          .status(400)
          .json({ error: "please try to login with  correct  credentials" });
      }

      const passcomp = await bcrypt.compare(password, user.password);

      if (!passcomp) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with  correct  credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = jwt.sign(data, jwtsect);

      success = true;

      res
        .status(200)
        .json({ success, mess: "login sucess full", jwttoken, email });
    } catch (e) {
      res.status(500).send("somenting went wrong user not login ");
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const id = req.data.id;
    // const user = await UserData.findById(id).select("-password")
    const user = await UserData.findById(id);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Interval server error ");
  }
});

module.exports = router;
