const User = require("../models/userModel");
// render login form
const getLoginController = (req, res) => {
  try {
    res.render("pages/login.ejs");
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Some Error Occured..");
  }
};

// render register form

const getRegisterController = (req, res) => {
  res.render("pages/register.ejs");
};

// register controller

const registerController = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });

    const regiseteredUser = await User.register(newUser, password);
    console.log(regiseteredUser);

    req.login(regiseteredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Stock Management .");
      res.redirect("/");
    });

    req.flash("success", "Welcome to Stock Management .");

    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Something Went Wrong In Registering. ");
  }
};

const getHelpController = (req, res) => {
  res.render("pages/help.ejs");
};

module.exports = {
  getLoginController,
  getRegisterController,
  registerController,
  getHelpController,
};
