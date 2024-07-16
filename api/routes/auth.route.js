import express from "express";
import { registerUser,loginUser,OAuthLogin} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/new",registerUser)
router.post("/login",loginUser)
router.post("/google",OAuthLogin)

export default router