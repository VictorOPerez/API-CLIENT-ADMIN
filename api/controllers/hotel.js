import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  console.log(req.body);
  const newHotel = new Hotel(req.body);
  console.log("es aqui en la  createHotel");

  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    next(err);
  }
};
export const updateteHotel = async (req, res, next) => {
  console.log("es aqui en la  updateteHotel");
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  console.log("es aqui en la  deleteHotel");
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  console.log("es aqui en la  getHotel");
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  let { min, max, limit, ...others } = req.query;
  // others = delete others.limit;
  console.log(req.query);

  // console.log("es aqui en la  getHotels-----", others, min, max);

  // console.log(min);
  // console.log(max);
  // console.log(others);
  // console.log(req.query);

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);

    // const hotels = await Hotel.find({ featured: req.query.featured }).limit(
    //   req.query.limit
    // );

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  console.log("es aqui en la  countByCity");
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  console.log("es aqui en la  countByCity");
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartament" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// export const getHotels = async (req, res, next) => {
//   try {
//     const hotels = await Hotel.find();
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };
