const userModel = require("../models/userModel");
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

const registerController = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;

    let userExist = await userModel.findOne({ email });
    if (userExist) {
      req.flash("error", "User Already Registered With This Email");
      return res.redirect("/api/v1/user/register");
    }

    const newUser = new userModel({ email, username }); // Change User to userModel

    const registeredUser = await newUser.save(); // Save the new user to the database

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Stock Management.");
      res.redirect("/");
    });
    // This line will not be executed as the response is already redirected above
    // req.flash("success", "Welcome to Stock Management.");
    // res.redirect("/api/v1/stock/home");
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Something Went Wrong In Registering.");
    res.redirect("/api/v1/user/register"); // Redirect to the registration page in case of error
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
