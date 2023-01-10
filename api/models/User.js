import mongoose from "mongoose";
const { Schema } = mongoose;

// const HotelSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
