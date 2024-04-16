if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // Import the Strategy object
const flash = require("connect-flash");
const userRoute = require("./routers/userRoute");
const stockRoute = require("./routers/stockRoute");
const User = require("./models/userModel");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

// Configuration
dotenv.config();

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = process.env.MONGODB_URL;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.error("Connection Error:", err);
  });

dotenv.config();
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.MY_SUPER_SECRET_CODE,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error In Mongo Session Stroe", err);
});
const sessionOption = {
  store,
  secret: process.env.MY_SUPER_SECRET_CODE,
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to set flash messages
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// View engine setup
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);
// this is Default route 
app.get("/", async (req, res) => {
  res.render("pages/index.ejs");
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
