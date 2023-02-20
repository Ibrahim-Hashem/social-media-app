import express from "express";
import {
  getUser,
  getUserFriends,
  addremoveFriend,
} from "../controllers/users.js";
import { verityToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verityToken, getUser);
router.get("/friends/:userId", verityToken, getUserFriends);

/* Update */
router.patch("/:id/:friendId", verityToken, addremoveFriend);

export default router;
