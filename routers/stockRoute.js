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
router.get("/home", getHomePageController);

// get Method || Rendering Add page
router.get("/add", getAddPageController);

// Post Method || Add
router.post("/add", addController);

// get Method || Rendering Update Page
router.get("/update/:id", getUpdatePageController);

// patch Update Route
router.put("/update/:id", updateController);

// get Method || Rendering Edit Page
router.get("/:id", editPageController);

// patch Update Route
router.post("/delete", deleteController);

module.exports = router;
