module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be logged in to Manage Your Stock.");
    return res.redirect("/api/v1/user/login");
  }
  next();
};
