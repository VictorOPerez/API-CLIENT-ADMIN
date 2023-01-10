import jwt from "jsonwebtoken";
import { createError } from "./error.js";

const verifyToken = (req, res, next) => {
  // console.log(req);
  // console.log(req.headers.cookie);

  // let i = 0,
  //   index = 0;
  // while (req.rawHeaders[i] !== "Cookie" && req.rawHeaders[i] !== "cookie") {
  //   index = i++;
  // }
  // console.log(index);
  // console.log(req.rawHeaders[index + 2]);
  // const token = req.rawHeaders[index + 2].split("=")[1];
  const token = req.headers.cookie.split("=")[1];

  console.log(token);
  console.log("es aqui verifyToken");

  if (!token) {
    return next(createError(401, "Your are not autenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  // console.log(req);
  console.log("es aqui verifyUser");

  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not autorizated"));
    }
  });
};
export const verifyAdmind = (req, res, next) => {
  console.log("es aqui verifyAdmind");
  // console.log(req);
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not autorizated"));
    }
  });
};
