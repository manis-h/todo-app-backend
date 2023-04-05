import express from "express"
import { deleteUser, getAllusers, getmyProfile, getUser, login, logout, register, updateUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import User from "../models/user.js";
const router = express.Router();
router.post("/user/new",register)

router.get("/user/me",isAuthenticated,getmyProfile)
router.post("/user/login",login)
router.get("/user/logout",logout)

router.get("/users/all",getAllusers)
router
.route("/userid/:id")
.get(getUser)
.put(updateUser)
.delete(deleteUser)
export default router