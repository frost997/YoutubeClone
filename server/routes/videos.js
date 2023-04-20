import express from "express";
import { tokenVerify } from "../verifyToken.js";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/videoController.js";

const router = express.Router();

//add video
router.post("/", tokenVerify, addVideo);

//update video
router.get("/find/:id", tokenVerify, getVideo);

//update video
router.put("/:id", tokenVerify, updateVideo);

//delete video
router.delete("/:id", tokenVerify, deleteVideo);

//view
router.put("/view/:id", addView);

//random video
router.get("/random", random);

//random video
router.get("/trending", trend);

//sub video
router.get("/sub", tokenVerify, sub);
//sub video
router.get("/tags", tokenVerify, getByTag);
//sub video
router.get("/search", tokenVerify, search);

export default router;
