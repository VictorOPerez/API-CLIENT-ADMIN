import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRoom,
  getHotels,
  updateteHotel,
} from "../controllers/hotel.js";
import { verifyAdmind } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE

router.post("/", verifyAdmind, createHotel);

// UPDATE

router.put("/:id", verifyAdmind, updateteHotel);
// DELETE

router.delete("/:id", verifyAdmind, deleteHotel);
// GET

router.get("/find/:id", getHotel);
// GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRoom);

export default router;
