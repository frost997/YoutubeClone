import Video from "../model/Video.js";
import { errorHandler } from "../helper/error.js";
import User from "../model/User.js";

const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userID: req.user.id, ...req.body });
    const addNewVideo = await newVideo.save();
    res.status(200).json(addNewVideo);
  } catch (error) {
    next(error);
  }
  return;
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(errorHandler(404, "video not found"));
    }
    if ((req.user.id = video.userID)) {
      const updateUser = await Video.findByIdAndUpdate(
        req.param.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } else {
      return next(errorHandler(403, "you can only update your video"));
    }
  } catch (error) {
    next(error);
  }
  return;
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(errorHandler(404, "video not found"));
    }
    if ((req.user.id = video.userID)) {
      const deleteUser = await Video.findByIdAndDelete(req.param.id);
      res.status(200).json("The video has been delete");
    } else {
      return next(errorHandler(403, "you can only delete your video"));
    }
  } catch (error) {
    next(error);
  }
  return;
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
  return;
};

const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id, {
      $inc: { views: 1 },
    });
    if (!video) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
  return;
};

const random = async (req, res, next) => {
  try {
    const video = await Video.aggregate([{ $sample: { size: 1 } }]);
    if (!video) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
  return;
};

const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (!video) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
  return;
};

const getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    if (!videos) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
  return;
};

const search = async (req, res, next) => {
  try {
    const query = req.query.q;
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(20);
    if (!videos) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
  return;
};

const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribsChannels = user.subscribedUser;

    const list = await Promise.all(
      subscribsChannels.map((channelID) => {
        return Video.find({ userID: channelID });
      })
    );
    if (!list) {
      return next(errorHandler(404, "video not found"));
    }
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
  return;
};

export {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  sub,
  search,
  getByTag,
};
