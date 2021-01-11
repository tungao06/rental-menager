const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.store = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    roles: req.body.roles,
  });

  await user.save();

  return res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  });
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (user) {
      await user.remove();
    }

    return res.send();
  } catch (err) {
    return res.status(400).json({ error: "User not found" });
  }
};
