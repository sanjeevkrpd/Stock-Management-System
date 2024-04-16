const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from mongoose

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  stocks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
