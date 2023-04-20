import jwt from "jsonwebtoken";
import { errorHandler } from "./helper/error.js";

export const tokenVerify = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "you are not authenticate for this action"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(errorHandler(403, "user not valid"));
    }
    req.user = user;
    next();
  });
};
