const express = require("express");
const { isLoggedIn } = require("../middleware");
const {
  getHomePageController,
  getAddPageController,
  addController,
  getUpdatePageController,
  updateController,
  editPageController,
  deleteController,
} = require("../controllers/stockCtrl");
const router = express.Router();

// get Method || Rendering Home page
router.get("/home",isLoggedIn, getHomePageController);

// get Method || Rendering Add page
router.get("/add",isLoggedIn, getAddPageController);

// Post Method || Add
router.post("/add",isLoggedIn, addController);

// get Method || Rendering Update Page
router.get("/update/:id",isLoggedIn, getUpdatePageController);

// patch Update Route
router.put("/update/:id",isLoggedIn, updateController);

// get Method || Rendering Edit Page
router.get("/:id",isLoggedIn, editPageController);

// patch Update Route
router.post("/delete",isLoggedIn, deleteController);

module.exports = router;
