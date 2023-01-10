import express from "express";
import {
  updateteUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmind, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete you account");
// });
// router.get("/checkadmin/:id", verifyAdmind, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete all account");
// });

// UPDATE

router.put("/:id", verifyUser, updateteUser);
// DELETE

router.delete("/:id", verifyUser, deleteUser);
// GET

router.get("/:id", verifyUser, getUser);
// GET ALL

router.get("/", verifyAdmind, getUsers);

export default router;
