import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./hotel.css";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchConstext } from "../../context/SearchContext";
import { AuthConstext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  // console.log(location);
  const id = location.pathname.split("/")[2];
  // console.log(id);
  // console.log(id[2]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthConstext);

  const navigate = useNavigate();
  // console.log(location.pathname);
  // console.log(data);
  const { dates, options } = useContext(SearchConstext);
  // console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSiderNumber;
    if (direction === "l") {
      newSiderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSiderNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSiderNumber);
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
      // console.log(openModal);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWraper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location {data.distance}m fron center
            </span>
            <span className="hotelPriceHiglight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airoport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => {
                return (
                  <div
                    onClick={() => handleOpen(i)}
                    className="hotelImgWrapper"
                  >
                    <img src={photo} className="hotelImg" />
                  </div>
                );
              })}
            </div>
            <div className="hotelDeails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Locate in the real heart of Krakow, this property has an
                  exellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
