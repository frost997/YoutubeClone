import express from "express";
import { googleAuth, signIn, signUp } from "../controllers/authentication.js";

const router = express.Router();

//CREATE USER
router.post("/signup", signUp);
//SIGN IN
router.post("/signin", signIn);
//GOOGLE AUTH
router.post("/googleauth", googleAuth);

export default router;
