import express from "express";
import { tokenVerify } from "../verifyToken.js";
import {
  deleteUser,
  getUser,
  like,
  subcribe,
  unsubcribe,
  updateUser,
  disLike,
} from "../controllers/userController.js";

const router = express.Router();

//update
router.put("/:id", tokenVerify, updateUser);

//delete
router.delete("/:id", tokenVerify, deleteUser);

//get
router.get("/find/:id", getUser);

//subscribe
router.put("/sub/:id", tokenVerify, subcribe);

//unsubcribe
router.put("/unsub/:id", tokenVerify, unsubcribe);

//like
router.put("/like/:videoID", tokenVerify, like);

//dislike
router.put("/dislike/:videoID", tokenVerify, disLike);
export default router;
