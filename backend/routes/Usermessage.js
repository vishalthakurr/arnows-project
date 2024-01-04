const express = require("express");
const UserBlog = require("../models/Message");
const fetchuser = require("../middleware/userfetch");
const router = express.Router();
// const UserData = require("../models/userCreateSchema")
const { body, validationResult } = require("express-validator");

//Route 1  Get all messs   detail using Post "/api/messs/fetchallmesss" . login    required
router.get("/allblog", fetchuser, async (req, res) => {
  try {
    // const mes = await UserBlog.find({ user: req.data.id });
    const mes = await UserBlog.find();
    res.json(mes);
  } catch (error) {
    return res.status(500).send({ error: " invalid server data" });
  }
});
router.get("/blogdetail/:id", fetchuser, async (req, res) => {
  try {
    const mes = await UserBlog.find({ _id: req.params.id });
    res.json(mes);
  } catch (error) {
    return res.status(500).send({ error: " invalid server data" });
  }
});

router.post("/addblog", fetchuser, async (req, res) => {
  const { content, title, user } = req.body;
  //if there are errpr , return bad request and thr error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const mess = await new UserBlog({
      content,
      title,
      user,
    });
    const savedmess = await mess.save();
    res.status(200).send({ sucess: true, message: "Blog Created" });
  } catch (error) {
    return res.status(500).send({ error: " invalid server data" });
  }
});

router.delete("/deletemessage/:id", fetchuser, async (req, res) => {
  try {
    let mess = await UserBlog.findById(req.params.id);
    if (!mess) {
      return res.status(404).send("Not found");
    }
    // allow deletion only if  user own this mess
    if (mess.user.toString() !== req.data.id) {
      return res.status(401).send("not allowed");
    }

    mess = await UserBlog.findByIdAndDelete(req.params.id);
    res.json({ sucess: "mess has been deleted", mess: mess });
  } catch (error) {
    return res.status(500).send({ error: " internal server error" });
  }
});

router.put("/updatemessage/:id", fetchuser, async (req, res) => {
  try {
    const { message } = req.body;

    // create newnotes object
    const newmessage = {};

    if (message) {
      newmessage.message = message;
    }

    //find the note to be updated    and update it

    let mess = await UserBlog.findById(req.params.id);
    if (!mess) {
      return res.status(404).send("Not found");
    }

    if (mess.user.toString() !== req.data.id) {
      return res.status(401).send("not allowed");
    }

    mess = await UserBlog.findByIdAndUpdate(
      req.params.id,
      { $set: newmessage },
      { new: true }
    );
    res.json({ mess });
  } catch (error) {
    return res.status(500).send({ error: " internal server error" });
  }
});

module.exports = router;
