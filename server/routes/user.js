import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

//add router, sends data from form to backend
router.post("/signin", signin);
router.post("/signup", signup);

export default router;