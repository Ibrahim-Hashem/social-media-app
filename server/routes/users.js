import express from "express";
import {
  getUser,
  getUserFriends,
  addremoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verifyToken, getUser);
router.get("/friends/:userId", verifyToken, getUserFriends);

/* Update */
router.patch("/:id/:friendId", verifyToken, addremoveFriend);

export default router;
