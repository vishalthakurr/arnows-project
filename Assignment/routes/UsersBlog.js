const express = require("express");
const UserBlog = require("../models/AddBlogSchema");
const fetchuser = require("../middleware/userfetch");
const router = express.Router();

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
  const { content, title, user, email } = req.body;
  try {
    const mess = await new UserBlog({
      content,
      title,
      user,
      email,
    });
    const savedmess = await mess.save();
    res.status(200).send({ sucess: true, message: "Blog Created" });
  } catch (error) {
    return res.status(500).send({ error: " invalid server data" });
  }
});

router.delete("/deleteBlog/:id", fetchuser, async (req, res) => {
  try {
    mess = await UserBlog.findByIdAndDelete(req.params.id);
    res.json({ sucess: "mess has been deleted" });
  } catch (error) {
    return res.status(500).send({ error: " internal server error" });
  }
});

router.put("/updateblog/:id", fetchuser, async (req, res) => {
  try {
    const { content, title } = req.body;
    // create Blog object
    const updateBlog = {};
    if ((content, title)) {
      updateBlog.content = content;
      updateBlog.title = title;
    }

    //find the note to be updated    and update it
    let mess = await UserBlog.findById(req.params.id);
    if (!mess) {
      return res.status(404).send("Not found");
    }

    mess = await UserBlog.findByIdAndUpdate(
      req.params.id,
      { $set: updateBlog },
      { new: true }
    );
    res.json({ sucess: "Blog Updated" });
  } catch (error) {
    return res.status(500).send({ error: " internal server error" });
  }
});

module.exports = router;
