import express from "express";
import { getUsers, UpdateDetails } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.get("/",getUsers)
router.post("/update/:id",verifyToken,UpdateDetails)

export default router