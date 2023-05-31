import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { errorHandler } from "../helper/error.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      console.log(req.body)
      return next(errorHandler(400, "Cannot find user"));
    } else {
      const isCorrect = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isCorrect) {
        return next(errorHandler(400, "Wrong crecidential"));
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...userDetail } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(userDetail);
    }
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("user created successfully");
  } catch (error) {
    next(error);
  }
};

const googleAuth = (req, res) => {
  console.log(req.body);
};

export { signIn, signUp, googleAuth };
