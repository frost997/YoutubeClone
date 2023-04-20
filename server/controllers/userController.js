import User from "../model/User.js";
import { errorHandler } from "../helper/error.js";

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
    return;
  } else {
    return next(errorHandler(403, "You can only update your account"));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been delete");
    } catch (error) {
      next(error);
    }
    return;
  } else {
    return next(errorHandler(403, "You can only delete your account"));
  }
};

const getUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
    return;
  }
};

const subcribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("subscribtion successfull");
  } catch (error) {
    return next(error);
  }
  return;
};

const unsubcribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.param.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("unSubscribtion successfull");
  } catch (error) {
    next(error);
  }
  return;
};

export { updateUser, deleteUser, getUser, subcribe, unsubcribe };
