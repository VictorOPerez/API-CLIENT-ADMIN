import mongoose from "mongoose";
const { Schema } = mongoose;

// const HotelSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavilableDates: [{ type: Date }] }],
  },
  { timestamps: true }
);

// [
//   {number:101,unavilableDates:[01.05.2022,02.05.2022]}
//   {number:102,unavilableDates:[]}
//   {number:103,unavilableDates:[]}
//   {number:104,unavilableDates:[]}
//   {number:105,unavilableDates:[]}
// ]
export default mongoose.model("Room", RoomSchema);
