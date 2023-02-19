import bcrytp from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrytp.genSalt(); // generate a salt used to hash the password
    const hashedPassword = await bcrytp.hash(password, salt); // hash the password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfiles: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 1000),
    }); // create a new user
    const savedUser = await newUser.save(); // save the user to the database
    res.status(201).json(savedUser); // send the user to the client and set the status to 201 (created)
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // grab the email and password from the request body
    const user = await User.findOne({ email: email }); // find the user with the email
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // send the error message to the client and set the status to 404 (not found)
    }
    const validPassword = await bcrytp.compare(password, user.password); // compare the password with the hashed password
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" }); // send the error message to the client and set the status to 401 (unauthorized)
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // create a token
    delete user.password; // delete the password from the user object
    res.status(200).json({ user, token }); // send the user and token to the client and set the status to 200 (ok)
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};
