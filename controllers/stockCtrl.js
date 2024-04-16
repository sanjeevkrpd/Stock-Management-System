const stockModel = require("../models/stockModel");
const userModel = require("../models/userModel");
const getHomePageController = async (req, res) => {
  try {
    let user = await userModel.findById(req.user._id).populate("stocks");

    res.render("pages/homepage.ejs", { stocks: user.stocks });
  } catch (error) {
    console.log(error.message);
    req.flash("error", "Some Error Occured.. :(");
  }
};

const getAddPageController = (req, res) => {
  try {
    res.render("pages/new.ejs");
  } catch (error) {
    console.log(error);
    req.flash("error", "Some Error Occured. :(");
  }
};

const addController = async (req, res) => {
  try {
    let stock = new stockModel(req.body.stock);
    await stock.save();

    let user = await userModel.findById(req.user._id);

    if (!user) {
      console.error("User not found.");
      req.flash("error", "User Not Found. Please Register.. :(");
      return res.redirect("/api/v1/user/login");
    }
    user.stocks.push(stock._id);
    await user.save();
    req.flash("success", "Product Add SuccessFully.");
    res.redirect("/api/v1/stock/home");
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error :(");
    res.redirect("/api/v1/user/login");
  }
};

const getUpdatePageController = async (req, res) => {
  try {
    const stock = await stockModel.findById(req.params.id);
    res.render("pages/update.ejs", { stock });
  } catch (error) {
    console.log(error);
    req.flash("error", "Some Error Occured..");
    res.redirect("/api/v1/stock/home");
  }
};

const updateController = async (req, res) => {
  try {
    let id = req.params.id;
    let stock = await stockModel.findByIdAndUpdate(id, { ...req.body.stock });
    await stock.save();
    req.flash("success", "Product Detail's Updated SuccessFully");
    res.redirect("/api/v1/stock/home");
  } catch (error) {
    console.log(error);
    req.flash("error", "Some Error Occured..");
    res.redirect("/api/v1/stock/home");
  }
};
const editPageController = async (req, res) => {
  try {
    let stock = await stockModel.findById(req.params.id);
    if (!stock) {
      req.flash("error", "Product Doesn't Exist AnyMore.");
      return res.redirect("/api/v1/stock/home");
    }
    res.render("pages/edit.ejs", { stock });
    req.flash("success", "Successfully Fetch The Details ...");
  } catch (error) {
    console.log(error);
    req.flash("error", "Some Error Occured..");
    res.redirect("/api/v1/stock/home");
  }
};

const deleteController = async (req, res) => {
  try {
    let stock = await stockModel.findByIdAndDelete(req.body.stockId);
    let user = await userModel.findById(req.body.userId);

    if (!user || !stock) {
      req.flash("error", "Error User Or Stock Is Invalid...");
      res.redirect("/api/v1/user/login");
    }

    user.stocks.pull(stock._id);
    await user.save();

    req.flash("success", "Product Deleted Successfully..");
    res.redirect("/api/v1/stock/home");
  } catch (error) {
    console.log(error);
    req.flash("error", "Some Error Occured..");
    res.redirect("/api/v1/stock/home");
  }
};

module.exports = {
  getHomePageController,
  getAddPageController,
  addController,
  getUpdatePageController,
  updateController,
  deleteController,
  editPageController,
  deleteController,
};
