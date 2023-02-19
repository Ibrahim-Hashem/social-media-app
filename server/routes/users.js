import express from "express";
import {
  getUser,
  getUserFriends,
  updateUser,
  deleteUser,
  addremoveFriend,
} from "../controllers/users.js";
import { verityToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/:id", verityToken, getUser);
router.get("/friends/:userId", verityToken, getUserFriends);

/* Update */
router.put("/:id", verityToken, updateUser);
router.patch("/:id/:friendId", verityToken, addremoveFriend);

/* Delete */
router.delete("/:id", verityToken, deleteUser);

export default router;
