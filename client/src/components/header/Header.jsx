import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { SearchConstext } from "../../context/SearchContext";
import { AuthConstext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOtions, setOpenOtions] = useState(false);
  const [options, setOtions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthConstext);

  const handleOtion = (name, operation) => {
    setOtions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchConstext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer lisMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerLisItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerLisItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerLisItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerLisItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerLisItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxi</span>
          </div>
        </div>
        {type != "list" && (
          <>
            <h1 className="headerTitle">
              {" "}
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels unlock instant savings of 10% or
              more with a free Lamabooking acoount
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Were are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOtions(!openOtions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} · ${options.room} room`}</span>
                {openOtions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOtion("adult", "d")}
                        >
                          -
                        </button>
                        <span className="otionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOtion("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOtion("children", "d")}
                        >
                          -
                        </button>
                        <span className="otionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOtion("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOtion("room", "d")}
                        >
                          -
                        </button>
                        <span className="otionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOtion("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
