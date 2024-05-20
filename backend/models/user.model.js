import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
  {
    timestampts: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
