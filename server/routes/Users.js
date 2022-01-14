const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  // Get all users
  const users = await Users.findAll({
    where: {
      accountType: "user",
    },
  });

  res.json(users);
});

router.get("/editById/:id", async (req, res) => {
  // Get the id of user to be edited
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});

router.post("/", validateToken, async (req, res) => {
  // Create a user
  const user = req.body;
  await Users.create(user);
  res.json(user);
});

router.post("/login", async (req, res) => {
  // Request admin login
  const { email, password } = req.body;

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) res.json({ error: "User doesn't exist" });

  if (password !== user.password) {
    res.json({ error: "Invalid username / password" });
  } else {
    const accessToken = sign(
      { username: user.username, id: user.id },
      "s3cr3tk3y"
    );

    res.json({
      accessToken,
      username: user.username,
      accountType: user.accountType,
    });
  }
});

router.post("/delete/:id", async (req, res) => {
  // Delete a user
  const id = req.params.id;
  await Users.destroy({
    where: {
      id: id,
    },
  });
  res.json({ message: "User successfully deleted!" });
});

module.exports = router;
