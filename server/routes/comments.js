import express from "express";
import { tokenVerify } from "../verifyToken.js";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", tokenVerify, addComment);
router.delete("/:id", tokenVerify, deleteComment);
router.get("/:videoID", tokenVerify, getComments);

export default router;
