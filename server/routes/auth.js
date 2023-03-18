const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, PasswordConfirm } =
      req.body.data;
    // console.log(req.body);
    // console.log(FirstName, LastName, Email, Password, PasswordConfirm);
    // generate new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(Password, salt);

    //create new user
    const newUser = new User({
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      password: hashedPassword,
    });

    //save user and respond
    console.log("trying...");
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("user not found");
    } else if (
      (await bcrypt.compare(req.body.password, user.password)) == false
    )
      res.status(400).json("wrong password");
    else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
