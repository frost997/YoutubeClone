import express from "express";
import { tokenVerify } from "../verifyToken.js";
import {
  deleteUser,
  getUser,
  subcribe,
  unsubcribe,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//update
router.put("/:id", tokenVerify, updateUser);

//delete
router.delete("/:id", tokenVerify, deleteUser);

//get
router.get("/find/:id", tokenVerify, getUser);

//subscribe
router.put("/sub/:id", tokenVerify, subcribe);

//unsubcribe
router.put("/unsub/:id", tokenVerify, unsubcribe);
export default router;
