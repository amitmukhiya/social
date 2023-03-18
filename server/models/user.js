const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 1,
      max: 20,
      
    },
    lastName: {
      type: String,
      require: true,
      min: 1,
      max: 20,
      
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 1,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: true,
    //   min: 8,
    // },

    // profilePicture: {
    //   type: String,
    //   default: "",
    // },

    // coverPicture: {
    //   type: String,
    //   default: "",
    // },

    // followers: {
    //   type: Array,
    //   default: [],
    // },

    // followings: {
    //   type: Array,
    //   default: [],
    // },

    
    //description
  //   desc: {
  //     type: String,
  //     max: 50,
  //   },

  //   city: {
  //     type: String,
  //     max: 50,
  //   },

  //   from: {
  //     type: String,
  //     max: 50,
  //   },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
