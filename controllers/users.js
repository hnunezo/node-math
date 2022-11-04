const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res, next) => {
  const { body } = req;
  const { username, password, fname, lname, email } = body;

  //password hash
  const saltRounds = 10;
  let passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    fname,
    lname,
    username,
    email,
    passwordHash,
  });

  user
    .save()
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { username, fname, lname, email } = body;
  const updatedUser = {
    username,
    fname,
    lname,
    email,
  };
  try {
    const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
