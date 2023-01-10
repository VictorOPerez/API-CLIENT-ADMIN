import "./searchitem.css";
import { Link } from "react-router-dom";

const Searchitem = ({ item }) => {
  // console.log(item);
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDsitance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartament wit Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelop">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great prince today
        </span>
      </div>
      <div className="siDatails">
        {item.rating && (
          <div className="siRating">
            <span>Exellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDatailTexs">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Include taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Searchitem;
