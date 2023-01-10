import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateteRoom,
} from "../controllers/room.js";
import { verifyAdmind } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE

router.post("/:hotelid", verifyAdmind, createRoom);

// UPDATE

router.put("/:id", verifyAdmind, updateteRoom);
// DELETE

router.delete("/:id/:hotelid", verifyAdmind, deleteRoom);
// GET

router.get("/:id", getRoom);
// GET ALL

router.get("/", getRooms);

export default router;
