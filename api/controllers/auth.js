import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    console.log("nuevo usuario", newUser);
    await newUser.save();
    res.status(200).send("user has been created.");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    if (!isPasswordCorrect) {
      // console.log(isPasswordCorrect, user.password, req.body.password);
      return next(createError(400, "Wrong password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    res
      .cookie("access_tokent", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
