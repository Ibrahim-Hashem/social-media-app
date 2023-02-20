import Post from "../models/posts.js";
import User from "../models/users.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body; // grab the userId, description, and picturePath from the request body

    const user = await User.findByiD(userId); // find the user with the userId

    const newPost = new Post({
      userId,
      description,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    }); // create a new post
    await newPost.save(); // save the post to the database
    const post = await Post.find(); // find all the posts
    res.status(200).json(post); // send the post to the client and set the status to 200 (ok)
  } catch (e) {
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // find all the posts
    res.status(200).json(posts); // send the posts to the client and set the status to 200 (ok)
  } catch (e) {
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.header.userId; // grab the userId from the request header

    const posts = await Post.find(userId); // find all the posts with the userId
  } catch (e) {
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};
export const likePost = async (req, res) => {
  
};
