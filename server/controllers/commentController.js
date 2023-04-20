import Comment from "../model/Comment.js";
import Video from "../model/Video.js";
import { errorHandler } from "../helper/error.js";

const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userID: req.user.id });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
  return;
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);
    if (req.user.id === comment.userID || req.user.id === video.userID) {
      await Comment.findOneAndDelete(res.params.id);
      res.status(200).json("Comment has been deleted");
    } else {
      return next(errorHandler("You can only delete your comment"));
    }
  } catch (error) {
    next(error);
  }
  return;
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoID: req.params.videoID });
    res.status(200).json(comments);
    return;
  } catch (error) {
    next(error);
  }
};
export { addComment, deleteComment, getComments };
