// Model
import User from "../models/user.model.js";

import bcrypt from "bcrypt";

export const signup = async (request, response) => {
  const { userName, email, password, confirmPassword } = request.body;
  const { path } = request.file;

  if (!path) {
    return response.status(400).send({ error: "Please upload an image" });
  }

  if (!userName || !email || !password || !confirmPassword) {
    return response
      .status(400)
      .send({ error: "Please fill all required fields" });
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    return response
      .status(400)
      .send({ error: "Username or email already in use" });
  }

  if (confirmPassword !== password) {
    return response
      .status(400)
      .send({ error: "Password and confirm password do not match" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    userName,
    profilePic: path,
  });

  response.status(201).send(newUser);
};

export const signin = async (request, response) => {};

export const logout = async (request, response) => {};
