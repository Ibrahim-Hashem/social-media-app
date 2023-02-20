import User from "../models/user.js";
import { verityToken } from "../middleware/auth.js";
import { router } from "../routes/users.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // find the user with the id
    const { password, ...other } = user._doc; // remove the password from the user object
    res.status(200).json(other); // send the user to the client and set the status to 200 (ok)
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params; // grab the id from the request params
    const user = await User.findById(id); // find the user with the id and grab the friends array
    const friends = await Promise.all(
      user.friends.map((Id) => User.findById(Id)) // map through the friends array and find the user with the id
    ); // find all the friends
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }; // return the id, firstName, lastName, and picturePath of the friend
      }
    ); // map through the friends array and remove the password from the user object
    res.status(200).json(formattedFriends); // send the friends array to the client and set the status to 200 (ok)
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};

export const addremoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await user.findById(id);
    const friend = await user.findById(friendId);
    if (user.friends.includes(friendId)) {
      await user.updateOne({ $pull: { friends: friendId } });
      await friend.updateOne({ $pull: { friends: id } });
    } else {
      await user.updateOne({ $push: { friends: friendId } });
      await friend.updateOne({ $push: { friends: id } });
    }

    const friends = await Promise.all(
      user.friends.map((Id) => User.findById(Id)) // map through the friends array and find the user with the id
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};
