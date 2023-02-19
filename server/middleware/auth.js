import { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const verityToken = (req, res, next) => {
  try {
    let token = req.header["Authorization"]; // grab the token from the authorization header
    if (!token) {
      return res.status(401).json({ error: "Access denied" }); // send the error message to the client and set the status to 401 (unauthorized)
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft(); // remove the Bearer part from the token
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token
    req.user = decoded; // set the user to the decoded token
    next(); // call the next middleware
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message }); // send the error message to the client and set the status to 500 (internal server error)
  }
};
