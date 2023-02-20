import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/js";
import { verityToken } from "../middleware/auth.js";

const router = express.Router();
/*READ*/

/*UPDATE*/
router.get("/", verityToken, getFeedPosts);
router.get("/:userId/posts", verityToken, getUserPosts);
router.get("/:id/like", verityToken, likePost);

export default router;
